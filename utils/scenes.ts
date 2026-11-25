export interface Kpi { files: number, layers: number, ifaces: number, loc: number }

export interface Item {
  id: string
  kind: 'region' | 'obj'
  x: number
  y: number
  w: number
  h: number
  label?: string
  sub?: string
  cls?: string
  base?: string
}

export class Heap {
  items: Record<string, Item> = {}
  add(id: string, p: Partial<Item>) {
    this.items[id] = { id, kind: 'obj', x: 0, y: 0, w: 0, h: 0, ...p }
    return this
  }

  region(id: string, p: Partial<Item>) {
    return this.add(id, { kind: 'region', label: '', ...p })
  }

  get(id: string) {
    return this.items[id]
  }

  set(id: string, p: Partial<Item>) {
    Object.assign(this.items[id], p)
    return this
  }

  each(f: (it: Item) => void) {
    Object.values(this.items).forEach(f)
    return this
  }

  clone() {
    const h = new Heap()
    h.items = structuredClone(this.items)
    return h
  }
}

export interface Step {
  t: string
  kpi?: Kpi
  code?: string
  hl?: number[]
  do?: (h: Heap) => void
}

export interface Scene {
  title: string
  legend: [string, string][]
  init: (h: Heap) => void
  steps: Step[]
}

const XS = [20, 345, 670]
const YS = [15, 222, 434]
const HS = [195, 200, 195]
const W = 310
const REG: Record<string, [number, number]> = {
  adin: [0, 0], ports: [1, 0], infra: [2, 0],
  app: [0, 1], domain: [1, 1], host: [2, 1],
  cmd: [0, 2], qry: [1, 2], pipe: [2, 2],
}

const slot = (r: string, i: number) => {
  const [c, row] = REG[r]
  return { x: XS[c] + 12 + (i % 2) * 148, y: YS[row] + 40 + Math.floor(i / 2) * 31, w: 142, h: 25 }
}

const region = (h: Heap, r: string, label: string) => {
  const [c, row] = REG[r]
  h.region(`R-${r}`, { x: XS[c], y: YS[row], w: W, h: HS[row], label, cls: 'layer fresh' })
}

const files = (h: Heap, r: string, names: string[], start = 0) => names.forEach((n, i) => {
  const iface = /^I[A-Z]/.test(n)
  h.add(n, { ...slot(r, start + i), label: n, cls: `file ${iface ? 'iface' : ''} fresh`, base: `file ${iface ? 'iface' : ''}` })
})

const settle = (h: Heap) => h.each((it) => {
  if (it.base !== undefined) it.cls = it.base
  if (it.kind === 'region') it.cls = 'layer'
})

const DDD: Step[] = [
  {
    kpi: { files: 1, layers: 1, ifaces: 0, loc: 1 },
    t: 'Requirement met. <b>One file. One line.</b><small>Now let’s do it properly.</small>',
    code: 'Console.WriteLine("Hello World");',
  },
  {
    kpi: { files: 3, layers: 2, ifaces: 0, loc: 45 },
    t: 'A greeting is clearly a core domain concept. It gets an <b>aggregate root</b>.',
    code: 'public sealed class Greeting : AggregateRoot<GreetingId>\n{\n    public Recipient Recipient { get; private set; }\n    public GreetingText Text { get; private set; }\n    private Greeting() { }\n}',
    hl: [1],
    do: (h) => {
      h.set('Program.cs', { x: 40, y: 560, w: 200, h: 50, sub: '' })
      region(h, 'domain', 'Domain')
      files(h, 'domain', ['Greeting', 'AggregateRoot'])
    },
  },
  {
    kpi: { files: 7, layers: 2, ifaces: 0, loc: 140 },
    t: 'Primitive obsession is a smell. “World” becomes a <b>Recipient</b>. “Hello” becomes <b>GreetingText</b>. Both are <b>value objects</b>.',
    code: 'public sealed record Recipient : ValueObject\n{\n    public string Name { get; }\n    public Recipient(string name) =>\n        Name = Guard.NotNullOrWhiteSpace(name);\n}',
    hl: [1],
    do: (h) => { settle(h); files(h, 'domain', ['GreetingId', 'Recipient', 'GreetingText', 'ValueObject'], 2) },
  },
  {
    kpi: { files: 11, layers: 2, ifaces: 2, loc: 235 },
    t: 'Something happened in the domain: a <b>domain event</b>. Creation is complex: a <b>factory</b>. Persistence ignorance: a <b>repository</b> interface.',
    code: 'public static Greeting Create(Recipient to, GreetingText text)\n{\n    var g = new Greeting(GreetingId.New(), to, text);\n    g.Raise(new GreetingCreated(g.Id, to, text));\n    return g;\n}',
    hl: [4],
    do: (h) => { settle(h); files(h, 'domain', ['GreetingCreated', 'IDomainEvent', 'GreetingFactory', 'IGreetingRepository'], 6) },
  },
  {
    kpi: { files: 16, layers: 3, ifaces: 4, loc: 330 },
    t: 'Never expose the domain. An <b>application service</b>, a <b>DTO</b>, and a <b>mapper</b> between them. And a <b>unit of work</b>.',
    code: 'public async Task<GreetingDto> GreetAsync(string name)\n{\n    var greeting = _factory.Create(new Recipient(name));\n    await _repository.AddAsync(greeting);\n    await _unitOfWork.CommitAsync();\n    return _mapper.Map(greeting);\n}',
    do: (h) => { settle(h); region(h, 'app', 'Application'); files(h, 'app', ['IGreetingAppService', 'GreetingAppService', 'GreetingDto', 'GreetingMapper', 'IUnitOfWork']) },
  },
  {
    kpi: { files: 18, layers: 4, ifaces: 4, loc: 410 },
    t: '<b>Infrastructure</b> implements the repository. Program.cs becomes the <b>host</b>.<small>Output: <code>Hello World</code>. Unchanged.</small>',
    code: '',
    do: (h) => {
      settle(h)
      region(h, 'infra', 'Infrastructure')
      files(h, 'infra', ['InMemoryGreetingRepo', 'UnitOfWork'])
      region(h, 'host', 'Host')
      h.set('Program.cs', { ...slot('host', 0), sub: '', cls: 'file', base: 'file' })
    },
  },
]

const HEX: Step[] = [
  {
    kpi: { files: 18, layers: 4, ifaces: 4, loc: 410 },
    t: 'Phase 2. The domain must not know there is a <b>console</b>.',
    code: '',
    do: h => settle(h),
  },
  {
    kpi: { files: 21, layers: 5, ifaces: 7, loc: 470 },
    t: '<b>Ports.</b> A driving port to greet. A driven port to present. And a clock, for testability.',
    code: 'public interface IGreetUseCase\n{\n    Task GreetAsync(GreetCommand command, CancellationToken ct);\n}\n\npublic interface IGreetingPresenter\n{\n    Task PresentAsync(GreetingDto greeting);\n}',
    do: (h) => { region(h, 'ports', 'Ports'); files(h, 'ports', ['IGreetUseCase', 'IGreetingPresenter', 'IClock']) },
  },
  {
    kpi: { files: 23, layers: 6, ifaces: 7, loc: 525 },
    t: '<b>Driving adapter:</b> the console drives the use case. Arguments get their own parser.',
    code: '',
    do: (h) => { settle(h); region(h, 'adin', 'Adapters (in)'); files(h, 'adin', ['ConsoleDriver', 'CliArgsParser']) },
  },
  {
    kpi: { files: 26, layers: 6, ifaces: 7, loc: 585 },
    t: '<b>Driven adapters.</b> Infrastructure is renamed. <code>Console.WriteLine</code> finally has a home: behind two interfaces.',
    code: 'public sealed class ConsolePresenter : IGreetingPresenter\n{\n    public Task PresentAsync(GreetingDto g)\n    {\n        Console.WriteLine($"{g.Text} {g.Recipient}");\n        return Task.CompletedTask;\n    }\n}',
    hl: [5],
    do: (h) => {
      settle(h)
      h.set('R-infra', { label: 'Adapters (out)', cls: 'layer fresh' })
      files(h, 'infra', ['ConsolePresenter', 'SystemClock'], 2)
      files(h, 'app', ['GreetUseCase'], 5)
    },
  },
  {
    kpi: { files: 28, layers: 6, ifaces: 7, loc: 625 },
    t: 'Wire it all up in the <b>composition root</b>.<small>Output: <code>Hello World</code>. Unchanged.</small>',
    code: 'services.AddScoped<IGreetUseCase, GreetUseCase>();\nservices.AddScoped<IGreetingPresenter, ConsolePresenter>();\nservices.AddScoped<IGreetingRepository, InMemoryGreetingRepo>();\nservices.AddScoped<IUnitOfWork, UnitOfWork>();\nservices.AddSingleton<IClock, SystemClock>();',
    do: (h) => {
      settle(h)
      h.set('R-host', { label: 'Composition root', cls: 'layer fresh' })
      files(h, 'host', ['DependencyInjection', 'ServiceRegistration'], 1)
    },
  },
]

const CQRS: Step[] = [
  {
    kpi: { files: 28, layers: 6, ifaces: 7, loc: 625 },
    t: 'Phase 3. Writing a greeting and reading a greeting are clearly <b>different concerns</b>.',
    code: '',
    do: h => settle(h),
  },
  {
    kpi: { files: 32, layers: 7, ifaces: 8, loc: 720 },
    t: 'The <b>command side</b>. A command, a handler, a validator.',
    code: 'public sealed record CreateGreetingCommand(string Recipient)\n    : ICommand<GreetingId>;\n\npublic sealed class GreetingValidator\n    : AbstractValidator<CreateGreetingCommand> { ... }',
    do: (h) => { region(h, 'cmd', 'Commands'); files(h, 'cmd', ['CreateGreetingCommand', 'CreateGreetingHandler', 'GreetingValidator', 'ICommandHandler']) },
  },
  {
    kpi: { files: 37, layers: 8, ifaces: 9, loc: 830 },
    t: 'The <b>query side</b>. A separate read model, kept up to date by a <b>projection</b>.',
    code: 'public sealed class GreetingProjection\n    : IHandle<GreetingCreated>\n{\n    public Task Handle(GreetingCreated e) =>\n        _readStore.UpsertAsync(new GreetingReadModel(\n            e.Id, $"{e.Text} {e.Recipient}"));\n}',
    do: (h) => { settle(h); region(h, 'qry', 'Queries'); files(h, 'qry', ['GetGreetingQuery', 'GetGreetingHandler', 'GreetingReadModel', 'GreetingProjection', 'IQueryHandler']) },
  },
  {
    kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 },
    t: 'Cross-cutting concerns go in a <b>pipeline</b>. Logging, validation, transactions.',
    code: 'public async Task<TRes> Handle(TReq req,\n    RequestHandlerDelegate<TRes> next, CancellationToken ct)\n{\n    _log.LogInformation("Handling {Request}", typeof(TReq).Name);\n    return await next();\n}',
    do: (h) => { settle(h); region(h, 'pipe', 'Pipeline'); files(h, 'pipe', ['LoggingBehavior', 'ValidationBehavior', 'TransactionBehavior', 'IPipelineBehavior']) },
  },
  {
    kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 },
    t: 'Done. <b>41 files. 9 layers. 10 interfaces.</b><small>Output: <code>Hello World</code>. Same as the first step.</small>',
    code: '',
    do: (h) => { settle(h); h.set('Program.cs', { cls: 'file glow', base: 'file glow' }) },
  },
]

const initProgram = (h: Heap) => h.add('Program.cs', { x: 320, y: 250, w: 360, h: 120, label: 'Program.cs', sub: 'Console.WriteLine("Hello World");', cls: 'file prog', base: 'file prog' })
const applyAll = (h: Heap, stages: Step[][]) => {
  stages.forEach(s => s.forEach(st => st.do?.(h)))
  settle(h)
}

const LEGEND: [string, string][] = [['layer', 'layer'], ['file', 'file'], ['iface', 'interface'], ['fresh', 'just added']]

const touch = (h: Heap, names: string[]) => names.forEach(n => h.set(n, { cls: `${h.get(n).base} touched` }))

export const SCENES: Record<string, Scene> = {
  ddd: { title: 'C#', legend: LEGEND, init: initProgram, steps: DDD },
  hex: { title: 'C#', legend: LEGEND, init: (h) => { initProgram(h); applyAll(h, [DDD]) }, steps: HEX },
  cqrs: { title: 'C#', legend: LEGEND, init: (h) => { initProgram(h); applyAll(h, [DDD, HEX]) }, steps: CQRS },
  change: {
    title: 'C#',
    legend: [['file', 'untouched'], ['touched', 'touched'], ['added', 'added']],
    init: (h) => {
      initProgram(h)
      applyAll(h, [DDD, HEX, CQRS])
      h.each((it) => { if (it.base) it.base = it.base.replace(' glow', '') })
      settle(h)
    },
    steps: [
      { kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 }, t: '<b>CR-0001.</b> “Hello World” → “Hello World<em>!</em>”<small>Files touched: 0</small>' },
      {
        t: '<code>GreetingText</code> is a value object. It validates: letters and spaces only. <b>“!” is rejected.</b><small>Files touched: 1</small>',
        code: 'public GreetingText(string value)\n{\n    if (!Regex.IsMatch(value, "^[A-Za-z ]+$"))\n        throw new DomainException("Invalid greeting");\n    Value = value;\n}',
        hl: [3],
        do: h => touch(h, ['GreetingText']),
      },
      {
        t: 'The command validator has the same rule. Of course it does.<small>Files touched: 2</small>',
        code: 'RuleFor(c => c.Text)\n    .Matches("^[A-Za-z ]+$");',
        do: h => touch(h, ['GreetingValidator']),
      },
      {
        kpi: { files: 43, layers: 9, ifaces: 10, loc: 1005 },
        t: '<code>GreetingCreated</code> is a published event. Events are immutable: a <b>V2</b> and an <b>upcaster</b>.<small>Files touched: 3 · added: 2</small>',
        code: 'public sealed record GreetingCreatedV2(\n    GreetingId Id, Recipient To, GreetingText Text,\n    string Punctuation) : IDomainEvent;',
        do: (h) => {
          touch(h, ['GreetingCreated'])
          h.add('GreetingCreatedV2', { ...slot('cmd', 4), label: 'GreetingCreatedV2', cls: 'file added', base: 'file added' })
          h.add('GreetingUpcaster', { ...slot('cmd', 5), label: 'GreetingUpcaster', cls: 'file added', base: 'file added' })
        },
      },
      {
        t: 'The read model stored the formatted text. Update the projection, then <b>rebuild</b> it.<small>Files touched: 5 · added: 2 · 1 replay</small>',
        code: '',
        do: h => touch(h, ['GreetingReadModel', 'GreetingProjection']),
      },
      {
        t: 'The DTO, the mapper and the presenter format the output.<small>Files touched: 8 · added: 2 · 1 replay</small>',
        do: h => touch(h, ['GreetingDto', 'GreetingMapper', 'ConsolePresenter']),
      },
      {
        t: '<b>8 touched. 2 added. 1 replay.</b> Plus their tests.<small>The one-line version: 1 file, 1 character.</small>',
        code: 'Console.WriteLine("Hello World!");',
        hl: [1],
        do: h => h.set('Program.cs', { cls: 'file glow' }),
      },
    ],
  },
}

const cache: Record<string, Heap[]> = {}

export function states(name: string): Heap[] {
  if (!cache[name]) {
    const sc = SCENES[name]
    let h = new Heap()
    sc.init(h)
    cache[name] = sc.steps.map((st) => {
      h = h.clone()
      st.do?.(h)
      return h
    })
  }
  return cache[name]
}

export function lastDefined<K extends keyof Step>(name: string, i: number, key: K): { v: Step[K] | undefined, at: number } {
  const steps = SCENES[name].steps
  for (let k = Math.min(i, steps.length - 1); k >= 0; k--) {
    if (steps[k][key] !== undefined) return { v: steps[k][key], at: k }
  }
  return { v: undefined, at: -1 }
}

export const kpiAt = (name: string, i: number) => lastDefined(name, i, 'kpi').v
export const sceneClicks = (name: string) => SCENES[name].steps.length - 1
