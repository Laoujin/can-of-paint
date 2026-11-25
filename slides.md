---
theme: none
title: Real DDD Fits in a Can of Paint
info: |
  An inversion talk on DDD, Hexagonal and CQRS.
  The cathedral is fake DDD. The painted feet are real DDD.
author: Wouter Van Schandevijl
colorSchema: light
aspectRatio: 16/9
canvasWidth: 1600
transition: fade
routerMode: hash
fonts:
  sans: Inter
  mono: JetBrains Mono
  serif: Georgia
  local: Georgia
  weights: '400,600,700,800'
layout: bleed
clicks: 1
---

<Art kind="feet" />
<div class="cold-line" v-click="1">Zero lines of code. A can of paint.</div>

<!--
[0:00, ~1.5 min] Walk on. Say nothing. Let the feet sit for three seconds.
"Best software project I've ever seen."
(beat)
[click] "Zero lines of code. A can of paint."
Do NOT explain. Move on: "Hold that thought. We'll come back to it."
The rest of act 1 is the opposite of this slide.
-->

---
layout: enterprise
title: Title
lvl: 0
stamps: [DRAFT]
---

<div class="ent-title">
  <div class="kicker">Reference Architecture · Volume I</div>
  <h1>Hello World,<br>Enterprise Edition</h1>
  <div class="subtitle">A scalable, maintainable, future-proof approach<br>to the display of a salutation</div>
  <div class="byline">Wouter Van Schandevijl · itenium</div>
</div>

<!--
[~1.5 min] Switch voice: corporate. "Good morning. Today I'm presenting the reference architecture for Hello World."
The template is deliberately ugly: navy, grey, fake logo, confidentiality footer. Every pattern we add, the chrome gets heavier.
Tagline for the room: this is a talk about complexity we didn't earn.
-->

---
layout: enterprise
title: Document control
heading: Document control
lvl: 1
crumb: [Governance, Document control]
stamps: ['Approved by<br>Architecture Board']
---

<table class="doc">
  <thead><tr><th>Version</th><th>Date</th><th>Author</th><th>Change</th><th>Status</th></tr></thead>
  <tbody>
    <tr><td>0.1</td><td>Day 1, 09:00</td><td>Developer</td><td>Print “Hello World”</td><td><span class="pill rej">Rejected</span></td></tr>
    <tr><td>1.0</td><td>Sprint 1</td><td>Architecture</td><td>Introduce Domain-Driven Design</td><td><span class="pill ok">Approved</span></td></tr>
    <tr><td>2.0</td><td>Sprint 3</td><td>Architecture</td><td>Introduce Hexagonal Architecture</td><td><span class="pill ok">Approved</span></td></tr>
    <tr><td>3.0</td><td>Sprint 6</td><td>Architecture</td><td>Introduce CQRS</td><td><span class="pill ok">Approved</span></td></tr>
    <tr><td>4.2.1</td><td>Sprint 14</td><td>Product Owner</td><td>CR-0001: add an exclamation mark</td><td><span class="pill pend">Impact analysis</span></td></tr>
  </tbody>
</table>

<!--
[~1 min] This IS the agenda, disguised. Read the rows quickly.
Version 0.1 was rejected. Hold on to that: the one-liner worked. It was rejected for not following the reference architecture.
Last row is the punchline of act 1. Don't explain it yet.
-->

---
layout: enterprise
title: US-0001
heading: US-0001
lvl: 1
crumb: [Requirements, US-0001]
kpi: { files: 1, layers: 1, ifaces: 0, loc: 1 }
clicks: 2
stamps: ['REJECTED<br><small>non-compliant with<br>reference architecture</small>']
stampIn: [2]
---

<div class="story">
  <div class="card"><div class="card-h">User story</div>As a <b>user</b><br>I want to see <b>“Hello World”</b><br>so that I <b>feel greeted</b>.
    <div class="ac">Acceptance criteria: the text “Hello World” is displayed.</div></div>
  <div class="oneliner" v-click="1"><div class="card-h">Implementation</div><CodeLines class="big-code" code='Console.WriteLine("Hello World");' /><div class="ac">Done in 4 minutes. Tests: n/a.</div></div>
</div>

<!--
[~1.5 min] The user story. Point at the KPI dashboard top right: 1 file, 1 layer, 0 interfaces, 1 line. Remember those numbers.
[click] The implementation. Done in four minutes.
[click] Stamp: REJECTED. "Not compliant with the reference architecture."
Nobody in the room will find that absurd. That's the problem.
-->

---
layout: enterprise
title: Domain-Driven Design
kicker: Phase 1
heading: Domain-Driven Design
lvl: 1
crumb: [Architecture, Phase 1]
scene: ddd
clicks: 5
---

<!--
[~4 min] Build the cathedral, one brick per click. Keep a straight face. Every step is something you've seen in a real codebase, and every step has a defensible reason on its own.
Watch the KPI counter in the corner: it is styled as a dashboard where up is good.
- Aggregate root + base class.
- Value objects: "primitive obsession".
- Domain event, factory, repository interface.
- Application service, DTO, mapper, unit of work.
- Infrastructure and a host.
End: 18 files. Output unchanged. Line counts are estimates for the example; keep the numbers consistent with the companion repo once it exists.
-->

---
layout: enterprise
title: Hexagonal Architecture
kicker: Phase 2
heading: Hexagonal Architecture
lvl: 2
crumb: [Architecture, Phase 2, Ports & adapters]
scene: hex
clicks: 4
stamps: ['Approved by<br>Architecture Board']
---

<!--
[~3 min] Breadcrumbs got deeper, the version number got longer, there's a stamp now. The chrome grows with the architecture.
- Ports: driving port, driven port, and a clock "for testability". There are no tests.
- Driving adapter + its own argument parser.
- Infrastructure is renamed "Adapters (out)". Console.WriteLine finally lives somewhere: behind two interfaces.
- Composition root.
28 files.
-->

---
layout: enterprise
title: CQRS
kicker: Phase 3
heading: CQRS
lvl: 3
crumb: [Architecture, Phase 3, Segregation, Commands & queries]
scene: cqrs
clicks: 4
stamps: ['Approved by<br>Architecture Board', 'Compliant<br>EAF §7.3.2', 'Reviewed']
---

<!--
[~3.5 min] "Writing a greeting and reading a greeting are clearly different concerns."
- Commands: command, handler, validator.
- Queries: query, handler, a read model, a projection to keep it in sync.
- A pipeline: logging, validation, transactions. For one line of output.
Last step: 41 files, 9 layers, 10 interfaces. Program.cs glows: the output is the same as step one.
Let the KPI sit. Then: "Stakeholder alignment."
-->

---
layout: enterprise
title: Stakeholder alignment achieved
heading: Stakeholder alignment achieved
lvl: 3
crumb: [Architecture, Phase 3, Sign-off]
kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 }
stamps: ['Approved by<br>Architecture Board', 'Signed off', 'Best practice']
---

<div class="stock">
  <div class="stock-ph">[ stock photo: two people in suits shaking hands in front of a whiteboard ]</div>
  <div class="stock-cap">41 files. 9 layers. 10 interfaces. Fully aligned with the reference architecture.</div>
</div>

<!--
[~45 s] The obligatory stock-photo slide. It's a placeholder on purpose: we don't need the photo, everyone can see it.
Point at the KPI: "Up and to the right."
Turn the corner: "And then, in sprint 14, the Product Owner had a request."
-->

---
layout: enterprise
title: Change request CR-0001
heading: Change request CR-0001
lvl: 3
crumb: [Change management, CR-0001]
kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 }
clicks: 1
stamps: ['Impact analysis<br>required']
stampIn: [1]
---

<div class="ticket">
  <div class="t-row"><span>Requested by</span><b>Product Owner</b></div>
  <div class="t-row"><span>Priority</span><b>Low</b></div>
  <div class="t-row"><span>Summary</span><b>Can it say “Hello World<em>!</em>” instead?</b></div>
  <div class="t-row"><span>Business value</span><b>Enthusiasm</b></div>
  <div class="t-row" v-click="1"><span>Estimate</span><b>To be determined by the Architecture Board</b></div>
</div>

<!--
[~45 s] One character. An exclamation mark.
[click] "Impact analysis required."
This is where the classic defence comes in: "DDD plus hexagonal isn't slower, once the structure is there." Let's count.
-->

---
layout: enterprise
title: One exclamation mark
kicker: Impact analysis
heading: One exclamation mark
lvl: 3
crumb: [Change management, CR-0001, Impact analysis]
scene: change
clicks: 6
stamps: ['Impact: HIGH']
---

<!--
[~2.5 min] Walk the ripple. Each click lights up one more file.
- GreetingText value object validates its input. "!" is rejected.
- The command validator duplicates the rule.
- The domain event is published, events are immutable: GreetingCreatedV2 and an upcaster.
- The read model stored the formatted text: update the projection and replay it.
- DTO, mapper, presenter.
8 touched, 2 added, 1 replay, plus tests. The one-liner: 1 file, 1 character.
Be fair: it's contrived. But the shape is real. A one-field change crossing validation, contracts, events and read models is every real ticket in a cathedral codebase.
-->

---
layout: enterprise
title: Isn't slower
lvl: 3
crumb: [Change management, Lessons learned]
kpi: { files: 43, layers: 9, ifaces: 10, loc: 1005 }
clicks: 1
---

<div class="statement">
  <div class="big">“Once the structure is in place,<br>DDD + Hex isn’t slower.”</div>
  <div class="small" v-click="1">It isn’t. Until something changes. <b>And something always changes.</b></div>
</div>

<!--
[~45 s] Quote the objection fairly. It's true for the first feature.
[click] The cost of structure is paid on every change, forever. Writing it once is cheap. Changing it is where the bill comes.
-->

---
layout: black
title: Hands up
clicks: 2
---

<div class="hands">
  <div class="q">?</div>
  <div class="hq reveal" :class="{ on: $clicks === 0 }">Who uses DDD, wishes they did,<br>or will in their next project?</div>
  <div class="hq reveal" :class="{ on: $clicks === 1 }">Keep your hand up<br>if you’ve read the blue book.</div>
  <div class="hq reveal" :class="{ on: $clicks === 2 }">Keep it up if you read it twice<br>and still had questions.</div>
  <div class="qn"><i class="reveal" :class="{ on: $clicks >= 0 }" /><i class="reveal" :class="{ on: $clicks >= 1 }" /><i class="reveal" :class="{ on: $clicks >= 2 }" /></div>
</div>

<!--
[~2 min] Black screen. The room should be lit for this; ask the tech crew in advance.
1. "Who uses DDD, wishes they were using it, or is going to use it in their next project?" Expect nearly every hand.
[click] 2. "Keep your hand up if you've read the blue book." Hands drop. (Blue book: Eric Evans, Domain-Driven Design, 2003.)
[click] 3. "Keep it up if you read it twice and still had questions." Probably only yours stays up. Keep your own hand up; let it land.
"So we're all doing DDD. Most of us haven't read it. That's fine: let's see what the people who wrote it say."
-->

---
layout: enterprise
title: Risk register
heading: Risk register
lvl: 3
crumb: [Governance, Risk register]
kpi: { files: 41, layers: 9, ifaces: 10, loc: 940 }
clicks: 2
---

<table class="doc risks">
  <thead><tr><th>ID</th><th>Raised by</th><th>Risk</th><th>Mitigation</th></tr></thead>
  <tbody>
    <tr><td>R-01</td><td>Martin Fowler<br><small>bliki: CQRS</small></td><td>“For most systems CQRS adds risky complexity.”<small>Use it on specific parts of a system, a bounded context, not the whole.</small></td><td v-click="1">None. Applied system-wide. <span class="istamp">Accepted</span></td></tr>
    <tr v-click="2"><td>R-02</td><td>Greg Young<br><small>A Decade of DDD, CQRS, Event Sourcing</small></td><td>CQRS is not a top-level architecture.<small>Apply it where it pays off, not across the system.</small></td><td>None. Applied as top-level architecture. <span class="istamp">Accepted</span></td></tr>
  </tbody>
</table>

<!--
[~2.5 min] Same parody template: the warnings exist, they are in the risk register, and they were accepted.
R-01: Martin Fowler's bliki entry on CQRS (martinfowler.com/bliki/CQRS.html). TODO: verify exact wording and link before the talk.
[click] Mitigation: none.
[click] R-02: Greg Young, the person who coined CQRS, "A Decade of DDD, CQRS, Event Sourcing" (DDD Europe 2016). His point: CQRS is not a top-level architecture, it belongs in specific places. The slide paraphrases him; TODO: get the exact quote and timestamp.
"The people who invented these patterns are the ones warning us. We put the warning in a register and moved on."
-->

---
layout: museum
title: Museum
---

<div class="museum-door">
  <div class="m-k">Permanent collection</div>
  <h1>The Museum of<br>Over-Engineering</h1>
  <div class="m-s">All exhibits anonymised. All exhibits real code, lovingly reconstructed.<br>Please do not refactor the exhibits.</div>
</div>

<!--
[~30 s] Change of tone: affectionate, not mocking. Everyone in this room has donated an exhibit; I've donated several.
TODO: replace the placeholder exhibits with real anonymised ones from audits and code reviews.
-->

---
layout: museum
title: 'Exhibit 1: The Decorated Foreach'
clicks: 1
---

<Exhibit :n="1" />

---
layout: museum
title: 'Exhibit 2: Interface, Alone'
clicks: 1
---

<Exhibit :n="2" />

---
layout: museum
title: 'Exhibit 3: The Four Identical Twins'
clicks: 1
---

<Exhibit :n="3" />

<!--
From the Architecture-KickOff "Cargo Cult Architecture" slide: identical classes mapped through 4 layers "in case they diverge".
Uniformity has a cost paid on every change, forever: 4 layers, 4 mappings, 4 copies.
-->

---
layout: museum
title: 'Exhibit 4: The Mediator to Nowhere'
clicks: 1
---

<Exhibit :n="4" />

---
layout: museum
title: 'Exhibit 5: The Event-Sourced Settings Page'
clicks: 1
---

<Exhibit :n="5" />

---
layout: museum
title: 'Exhibit 6: Repository, Nested'
clicks: 1
---

<Exhibit :n="6" />

---
layout: museum
title: In fairness
clicks: 4
---

<div class="steel">
  <div class="m-k">On loan: when the cathedral is a cathedral</div>
  <ul>
    <li v-click="1"><b>DDD tactical patterns</b> when the domain has real invariants that are hard to keep consistent</li>
    <li v-click="2"><b>Bounded contexts</b> when several teams, or several meanings of “customer”, collide</li>
    <li v-click="3"><b>Hexagonal</b> when you really do swap adapters: two UIs, three integrations, a test harness</li>
    <li v-click="4"><b>CQRS / Event Sourcing</b> when reads and writes differ wildly, or the history <i>is</i> the business</li>
  </ul>
</div>

<!--
[~2 min] The steelman. Say this sincerely: these patterns are good. They are answers to real questions.
Walk the four: each one has a question it answers. If you can't state the question for your system, you don't need the answer.
Bridge: "So what does the real thing look like?"
-->

---
layout: enterprise
title: The turn
class: turn
lvl: 3
crumb: [Architecture, Phase 4, Roadmap, Next steps]
kpi: { files: 43, layers: 9, ifaces: 10, loc: 1005 }
clicks: 1
stamps: ['Approved by<br>Architecture Board', 'Compliant<br>EAF §7.3.2', 'Reviewed']
---

<div class="turn-ent reveal" :class="{ on: $clicks < 1 }"><h2>Phase 4: Event Sourcing</h2><div class="small">Roadmap pending Architecture Board approval</div></div>
<div class="turn-photo reveal" :class="{ on: $clicks >= 1 }"><Art kind="feet" :opts="{ w: 1200, h: 675, scale: 1.05 }" /></div>

<!--
[~30 s] Start as if a Phase 4 is coming. "Phase four: event sourcing…"
[click] Everything falls away. White. The feet. No text.
Pause. Let the silence work. From here on: plain, minimal, one idea per slide.
-->

---
layout: min
title: The feet
clicks: 5
---

<div class="story-cap">
  <span class="reveal" :class="{ on: $clicks === 0 }">A wall of gauges.</span>
  <span class="reveal" :class="{ on: $clicks === 1 }">A technician walks the wall and writes down every reading.</span>
  <span class="reveal" :class="{ on: $clicks === 2 }">Readings come back wrong. Written on the move, read from the wrong spot.</span>
  <span class="reveal" :class="{ on: $clicks === 3 }">The plan: tablets, OCR, a sync backend, dashboards. Plus maintenance. Plus ops.</span>
  <span class="reveal" :class="{ on: $clicks === 4 }">The fix: paint where to stand.</span>
  <span class="reveal" :class="{ on: $clicks === 5 }">The errors went away.</span>
</div>
<Art kind="factory" :step="$clicks" />

<!--
[~4 min] Tell the story slowly. TODO: confirm the story can be told publicly and fill in the real details (industry, how many gauges, what the errors cost). The slide is a generic reconstruction: a wall of gauges, a technician, a clipboard.
0. A wall of gauges in a plant.
[click] 1. The technician walks the wall, clipboard, writing as they go.
[click] 2. Errors. Readings taken while walking, from wherever you happened to be.
[click] 3. The proposed fix: a multi-million software programme. Tablets, OCR, sync, database, dashboards, licences, training. And then maintenance and ops for as long as it lives.
[click] 4. The actual fix: someone went and stood at the wall. Painted feet in front of each gauge: stand here, read it straight on.
[click] 5. The errors went away. Zero lines of code. A can of paint.
-->

---
layout: min
title: Understanding the domain
---

<div class="statement"><div class="big">Understanding the domain<br><mark>was</mark> the DDD.</div></div>

<!--
[~45 s] Whoever painted the feet did Domain-Driven Design: they went to the place where the work happens, talked to the person doing it, and understood the actual problem.
No aggregates. No repositories. All the DDD.
-->

---
layout: min
title: Throughline
clicks: 1
---

<div class="statement">
  <div class="big">The cathedral is fake DDD.</div>
  <div class="small" v-click="1"><span class="xl">The painted feet are <mark>real DDD</mark>.</span></div>
</div>

<!--
[~45 s] The headline of the talk. Say it, then click, then say the second half.
If the audience takes one sentence home, this is the one.
-->

---
layout: min
title: Pareto
clicks: 3
---

<div class="min-h">Domain-Driven Design</div>
<Art kind="pareto" :step="$clicks" />

<!--
[~3 min] Pareto, roughly.
[click] The strategic part (ubiquitous language, bounded contexts, anti-corruption layers, talking to the domain experts) is maybe 20% of the book and 80% of the value.
[click] The tactical part (aggregates, entities, value objects, repositories, factories, domain events) is most of the pages and a fraction of the value.
[click] And which part do teams adopt? The tactical part. Because you can copy it. You can't copy a conversation with a technician.
-->

---
layout: min
title: Mentor
---

<div class="statement"><div class="big">Before you draw a box,<br>go stand where the user stands.</div></div>

<!--
[~30 s] The one-sentence mentor advice. Nothing else on this slide; don't elaborate.
-->

---
layout: min
title: Earned
clicks: 1
---

<div class="statement">
  <div class="big">Complexity should be <mark>earned</mark>,<br>not installed.</div>
  <div class="small" v-click="1">These patterns are answers. Most teams never had the question.</div>
</div>

<!--
[~1 min] The two taglines from the pitch.
"Installed" is the word: we install DDD + Hex + CQRS like a project template, on day one, before there is a domain to model.
[click] Answers without the question.
-->

---
layout: min
title: Liability
clicks: 4
---

<div class="statement">
  <div class="big">Source code is a liability.</div>
  <ul class="nots"><li v-click="1">No maintenance.</li><li v-click="2">No 3am calls.</li><li v-click="3">No ops cost.</li><li v-click="4">No downtime.</li></ul>
</div>

<!--
[~1.5 min] The asset is the behaviour. The code is what you pay to get it, and you keep paying.
The best software is the software you don't write.
[click] No maintenance. [click] No 3am calls. [click] No ops cost. [click] No downtime.
The painted feet have had all four for years.
-->

---
layout: min
title: One-liner
clicks: 1
---

<div class="ps-wrap">
  <div class="ps"><span class="ps-cmd">Write-Host</span> <span class="ps-str">"Hello World!"</span></div>
  <div class="ps-vs" v-click="1"><Art kind="miniCathedral" /><div>43 files · 9 layers · 1 replay</div></div>
</div>

<!--
[~45 s] The PowerShell one-liner, alone, in huge type. CR-0001 included.
[click] Next to it, the cathedral, small. Let them compare. Don't say anything.
-->

---
layout: bleed
title: End
clicks: 1
---

<Art kind="feet" />
<div class="end-title" v-click="1">Real DDD fits in a can of paint.</div>

<!--
[~30 s] End on the feet. Let them sit.
[click] The title of the talk, finally: "Real DDD fits in a can of paint."
"Thank you." Then questions.
(Optional closing line: "Go paint some feet.")
-->

---
layout: min
title: About
---

<div class="about-wrap">
  <div class="min-h">About this deck</div>
  <h2>Real DDD Fits in a Can of Paint</h2>
  <p>Wouter Van Schandevijl · itenium</p>
  <p>Source of the talk idea: <a href="https://github.com/itenium-be/Architecture-KickOff/issues/4">github.com/itenium-be/Architecture-KickOff/issues/4</a></p>
  <p>Slides: <a href="https://github.com/Laoujin/can-of-paint">github.com/Laoujin/can-of-paint</a></p>
  <p class="dim">All artwork is drawn in SVG/CSS for this deck. Code exhibits are reconstructions, not client code.</p>
</div>

<!--
Not part of the talk.
-->
