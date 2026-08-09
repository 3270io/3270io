# Third-Party Licences

This repository is the landing page for 3270.io. It ships no mainframe
software of its own: what it bundles is the JavaScript that renders the page,
and what it *describes* is two products that run s3270. Both are recorded here.

## s3270 — the x3270 family of 3270 terminal emulators

Neither of the products this site launches into speaks TN3270 itself. Both
3270Connect and 3270Web run **s3270** — the scripting member of the **x3270**
family of 3270 terminal emulators — as a separate process, and it is s3270 that
carries every screen they render.

Three decades of protocol work — EBCDIC code pages, field attributes,
structured fields, TLS negotiation — by Paul Mattes and the x3270 contributors,
given away for anyone to build on. Our thanks to them.

- Project home and documentation: <https://x3270.miraheze.org/wiki/Main_Page>
- Source: <https://github.com/pmattes/x3270>
- Licence: <https://github.com/pmattes/x3270/blob/master/LICENSE.md>

**This repository does not redistribute s3270.** The binaries ship in the two
product repositories, whose third-party licence files reproduce the BSD
3-Clause text in full:

- [3270Connect](https://github.com/3270io/3270Connect/blob/main/THIRD-PARTY-LICENSES.md)
- [3270Web](https://github.com/3270io/3270Web/blob/main/THIRD-PARTY-LICENSES.md)

The licence is reproduced below as well, so that this repository carries it
alongside the credit its site displays.

### Licence — BSD 3-Clause

Reproduced verbatim from the x3270 distribution.

```
Copyright (c) 1993-2026 Paul Mattes.
Copyright (c) 2004-2005 Don Russell.
Copyright (c) 2004 Dick Altenbern.
Copyright (c) 1990 Jeff Sparkes.
Copyright (c) 1989 Georgia Tech Research Corporation (GTRC), Atlanta, GA
 30332.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
- Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
- Neither the names of Paul Mattes, Don Russell, Dick Altenbern, Jeff
      Sparkes, GTRC nor the names of their contributors may be used to endorse
      or promote products derived from this software without specific prior
      written permission.

THIS SOFTWARE IS PROVIDED BY PAUL MATTES, DON RUSSELL, JEFF SPARKES, DICK
ALTENBERN AND GTRC "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL PAUL MATTES, DON RUSSELL,
DICK ALTENBERN, JEFF SPARKES OR GTRC BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

### On the third clause

The licence's third clause reserves the authors' names: they may not be used to
endorse or promote products derived from the software without prior written
permission. Nothing on the 3270.io site or in this repository is offered as an
endorsement. The x3270 authors have no involvement in 3270.io, 3270Connect or
3270Web and have not reviewed, approved or promoted them. Naming them is a
statement of what the software uses, and our thanks for it.

## Site dependencies

The built site bundles the runtime dependencies below. All are permissive
(MIT, ISC or Apache-2.0); each package carries its own licence text in its
`node_modules` directory, and the authoritative statement for any of them is
the `LICENSE` file in that package rather than this table.

Regenerate this table after changing `package.json` dependencies.

| Package | Licence |
|---|---|
| `@github/spark` | MIT |
| `@heroicons/react` | MIT |
| `@hookform/resolvers` | MIT |
| `@octokit/core` | MIT |
| `@phosphor-icons/react` | MIT |
| `@radix-ui/colors` | MIT |
| `@radix-ui/react-accordion` | MIT |
| `@radix-ui/react-alert-dialog` | MIT |
| `@radix-ui/react-aspect-ratio` | MIT |
| `@radix-ui/react-avatar` | MIT |
| `@radix-ui/react-checkbox` | MIT |
| `@radix-ui/react-collapsible` | MIT |
| `@radix-ui/react-context-menu` | MIT |
| `@radix-ui/react-dialog` | MIT |
| `@radix-ui/react-dropdown-menu` | MIT |
| `@radix-ui/react-hover-card` | MIT |
| `@radix-ui/react-label` | MIT |
| `@radix-ui/react-menubar` | MIT |
| `@radix-ui/react-navigation-menu` | MIT |
| `@radix-ui/react-popover` | MIT |
| `@radix-ui/react-progress` | MIT |
| `@radix-ui/react-radio-group` | MIT |
| `@radix-ui/react-scroll-area` | MIT |
| `@radix-ui/react-select` | MIT |
| `@radix-ui/react-separator` | MIT |
| `@radix-ui/react-slider` | MIT |
| `@radix-ui/react-slot` | MIT |
| `@radix-ui/react-switch` | MIT |
| `@radix-ui/react-tabs` | MIT |
| `@radix-ui/react-toggle` | MIT |
| `@radix-ui/react-toggle-group` | MIT |
| `@radix-ui/react-tooltip` | MIT |
| `@tailwindcss/container-queries` | MIT |
| `@tailwindcss/vite` | MIT |
| `@tanstack/react-query` | MIT |
| `class-variance-authority` | Apache-2.0 |
| `clsx` | MIT |
| `cmdk` | MIT |
| `d3` | ISC |
| `date-fns` | MIT |
| `embla-carousel-react` | MIT |
| `framer-motion` | MIT |
| `input-otp` | MIT |
| `lucide-react` | ISC |
| `marked` | MIT |
| `next-themes` | MIT |
| `octokit` | MIT |
| `react` | MIT |
| `react-day-picker` | MIT |
| `react-dom` | MIT |
| `react-error-boundary` | MIT |
| `react-hook-form` | MIT |
| `react-resizable-panels` | MIT |
| `recharts` | MIT |
| `sonner` | MIT |
| `tailwind-merge` | MIT |
| `three` | MIT |
| `tw-animate-css` | MIT |
| `uuid` | MIT |
| `vaul` | MIT |
| `zod` | MIT |
`class-variance-authority` is Apache-2.0; the remainder are MIT or ISC. None of
these dependencies imposes a copyleft obligation on this repository's own
source, which is MIT licensed (see `LICENSE`).

Build-time dependencies (Vite, TypeScript, Tailwind, ESLint and their
transitive packages) are not bundled into the published site and are not
listed here.
