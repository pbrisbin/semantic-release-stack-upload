"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = require("./package");
describe("Package", () => {
    it("reads an example file", () => {
        const packageYaml = new package_1.Package(FIXTURE);
        expect(packageYaml.getName()).toEqual("shellwords");
    });
    it("can be updated and rewritten", () => {
        const packageYaml = new package_1.Package(FIXTURE);
        const updatedVersion = "0.1.42.42";
        packageYaml.setVersion(updatedVersion);
        expect(packageYaml
            .render()
            .split("\n")
            .find((x) => x.startsWith("version: "))).toEqual(`version: ${updatedVersion}`);
    });
    it("can infer a version prefix", () => {
        const packageYaml = new package_1.Package(FIXTURE);
        expect(packageYaml.inferVersionPrefix()).toEqual("0.");
    });
});
const FIXTURE = `
name: shellwords
version: 0.0.0.0
synopsis: Parse strings into words, like a shell would
description: See https://github.com/pbrisbin/hs-shellwords#readme
category: Text
author: Patrick Brisbin
maintainer: pbrisbin@gmail.com
copyright: 2018 Patrick Brisbin
license: MIT
github: pbrisbin/hs-shellwords
extra-doc-files:
  - README.md
  - CHANGELOG.md
ghc-options:
  - -Weverything
  - -Wno-all-missed-specialisations
  - -Wno-missed-specialisations
  - -Wno-missing-exported-signatures
  - -Wno-missing-import-lists
  - -Wno-missing-local-signatures
  - -Wno-monomorphism-restriction
  - -Wno-safe
  - -Wno-unsafe
when:
  - condition: impl(ghc >= 9.2)
    ghc-options:
      - -Wno-missing-kind-signatures
  - condition: impl(ghc >= 8.10)
    ghc-options:
      - -Wno-missing-safe-haskell-mode
      - -Wno-prepositive-qualified-module
dependencies:
  - base < 5
default-extensions:
  - NoImplicitPrelude
library:
  source-dirs: src
  dependencies:
    - megaparsec
    - text
tests:
  hspec:
    main: Spec.hs
    source-dirs: test
    ghc-options:
      - -threaded
      - -rtsopts
      - -with-rtsopts=-N
    dependencies:
      - hspec
      - shellwords
      - megaparsec
    build-tools:
      - hspec-discover
`;
//# sourceMappingURL=package.test.js.map