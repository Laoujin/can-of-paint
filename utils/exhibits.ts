export interface ExhibitData { name: string, year: number, materials: string, code: string, note: string }

export const EXHIBITS: Record<number, ExhibitData> = {
  1: {
    name: 'The Decorated Foreach',
    year: 2019,
    materials: 'C#, 4 decorators, 1 foreach',
    code: 'IProcessor<Order> p =\n    new LoggingProcessor<Order>(\n    new RetryingProcessor<Order>(\n    new ValidatingProcessor<Order>(\n    new MetricsProcessor<Order>(\n    new OrderProcessor()))));\n\n// OrderProcessor.Process:\nforeach (var line in order.Lines) line.Total = line.Qty * line.Price;',
    note: 'Four layers of cross-cutting concern around a loop that cannot fail. The retry decorator has never retried.',
  },
  2: {
    name: 'Interface, Alone',
    year: 2017,
    materials: 'C#, 1 interface, 1 implementation, 0 alternatives',
    code: 'public interface ICustomerService\n{\n    Customer Get(int id);\n}\n\npublic class CustomerService : ICustomerService\n{\n    public Customer Get(int id) => _repo.Get(id);\n}',
    note: 'Extracted “in case we need a second implementation.” The second implementation is expected any decade now.',
  },
  3: {
    name: 'The Four Identical Twins',
    year: 2021,
    materials: 'C#, 4 classes, 3 mappers, 0 differences',
    code: 'public class CustomerEntity    { public string Name { get; set; } }\npublic class CustomerModel     { public string Name { get; set; } }\npublic class CustomerDto       { public string Name { get; set; } }\npublic class CustomerViewModel { public string Name { get; set; } }',
    note: 'Kept separate “in case they diverge.” Visitors spend hours looking for the difference. There is none.',
  },
  4: {
    name: 'The Mediator to Nowhere',
    year: 2022,
    materials: 'C#, 1 controller, 1 request, 1 handler, 1 repository, 1 line of logic',
    code: '[HttpGet("{id}")]\npublic Task<CustomerDto> Get(int id) =>\n    _mediator.Send(new GetCustomerQuery(id));\n\npublic Task<CustomerDto> Handle(GetCustomerQuery q, CancellationToken ct) =>\n    _repository.GetAsync(q.Id);',
    note: '“Go to definition” leads to an interface. Visitors are advised to bring a map.',
  },
  5: {
    name: 'The Event-Sourced Settings Page',
    year: 2020,
    materials: 'C#, 1 event store, 6 event types, 3 settings',
    code: 'public record DarkModeEnabled(Guid UserId);\npublic record DarkModeDisabled(Guid UserId);\npublic record LanguageChanged(Guid UserId, string Lang);\n\n// 2 years in production, 41,000 events,\n// one question asked: "is dark mode on?"',
    note: 'A complete audit trail of every time someone toggled dark mode. Nobody has ever asked for it.',
  },
  6: {
    name: 'Repository, Nested',
    year: 2018,
    materials: 'C#, 1 generic repository wrapping a generic repository',
    code: 'public class Repository<T> : IRepository<T>\n{\n    private readonly DbSet<T> _set;\n    public T Get(int id) => _set.Find(id);\n    public void Add(T e) => _set.Add(e);\n}',
    note: 'An abstraction over Entity Framework, which is itself a repository and a unit of work. Preserved in its natural habitat.',
  },
}
