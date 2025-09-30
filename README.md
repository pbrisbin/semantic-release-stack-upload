> [!NOTE]
> All of my GitHub repositories have been **archived** and will be migrated to
> Codeberg as I next work on them. This repository either now lives, or will
> live, at:
>
> https://codeberg.org/pbrisbin/semantic-release-stack-upload
>
> If you need to report an Issue or raise a PR, and this migration hasn't
> happened yet, send an email to me@pbrisbin.com.

# semantic-release-stack-upload

[semantic-release][] plugin to publish a Haskell package to [Hackage][] using
`stack upload`.

[semantic-release]: https://semantic-release.gitbook.io/semantic-release/
[hackage]: https://hackage.haskell.org/

## Requirements

1. Hpack in use, e.g. `package.yaml` exists

## Features

1. Supports multi-package projects
1. Supports PVP + SemVer versioning style
1. Supports `stack upload` behaviors like `--candidate` and `--pvp-bounds`

## Steps

| Step               | Description                                                                    |
| ------------------ | ------------------------------------------------------------------------------ |
| `verifyConditions` | verify the environment variable `HACKAGE_KEY` is set and `package.yaml` exists |
| `verifyRelease`    | Update the version in `package.yaml` **if `PREPARE_IN_VERIFY=1`**              |
| `prepare`          | Update the version in `package.yaml`                                           |
| `publish`          | run `stack upload` to publish the package                                      |

## Environment variables

| Variable            | Description                                                    | Required |
| ------------------- | -------------------------------------------------------------- | -------- |
| `HACKAGE_KEY`       | [API token](https://hackage.haskell.org/packages/) for hackage | true     |
| `PREPARE_IN_VERIFY` | Should we update `package.yaml` in `verifyRelease`?            | false    |

## Prepare in Verify and `dryRun`

If the `PREPARE_IN_VERIFY` environment variable is set to `1`, we will perform
what is usually done in `prepare` as part of `verifyRelease`, i.e. update the
`package.yaml` file with the next version.

This is useful if, for example, you are compiling a binary that includes a
`version` sub-command or `--version` flag that uses the package version [through
the generated `Paths_` module][paths-version]. If `package.yaml` is not updated
before this compilation, the compiled-in version will be wrong.

To accomplish a pre-compile update, you can run `semantic-release` in [`dryRun`
mode][dryRun] with `PREPARE_IN_VERIFY=1`, build your assets, then run it again
to actually release.

[dryRun]: https://semantic-release.gitbook.io/semantic-release/usage/configuration#dryrun
[paths-version]: https://stackoverflow.com/a/2892624

## Install

With npm:

```console
npm install semantic-release-stack-upload -D
```

With yarn:

```console
yarn add semantic-release-stack-upload --dev
```

## GitHub Actions

```yaml
- id: release
  uses: cycjimmy/semantic-release-action@v4
  with:
    extra_plugins: |
      semantic-release-stack-upload
  env:
    GITHUB_TOKEN: ${{ github.token }}
    HACKAGE_KEY: ${{ secrets.HACKAGE_KEY }}
```

## Usage

The plugin can be configured in the [semantic-release configuration
file][semantic-release-config]:

[semantic-release-config]: https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-stack-upload",
      {
        "pvpBounds": "lower",
        "stripSuffix": true
      }
    ]
  ]
}
```

## Configuration

All options are optional.

### _candidate_

**Default**: undefined

Upload a release candidate (use the `--candidate` option). If this is undefined,
prerelease branches upload candidates and release branches don't.

### _ignoreCheck_

**Default**: `false`

Do not check packages for common mistakes (use the `--ignore-check` option).

### _item_

**Default**: `.`

A relative path to a package directory to upload.

> [!NOTE]
> This also determines where the `package.yaml` file is expected.

### _pvpBounds_

**Default**: `none`

Automatically add PVP bounds to dependencies based on the active resolver at
time of upload (use the `--pvp-bounds` option). One of `none`, `lower`, `upper`,
or `both`.

> [!NOTE]
> You may wish to set `STACK_YAML` to inform this.

### _stripSuffix_

**Default**: `false`

Whether to strip prerelease suffixes from versions. For example, when `true`, a
version like `1.0.0-rc.plugin.1` will be released as `1.0.0`.

### _versionPrefix_

**Default**: undefined

A prefix to apply to the version when used for the package. This allows the
project to use [SemVer][] (e.g. `1.0.0`), but release [PVP][]-compliant packages
by adding a prefix like `"0."` to result in `0.1.0.0`

[semver]: https://semver.org/
[PVP]: https://pvp.haskell.org/

If not defined, and your checked-in `package.yaml` uses a version matching
`^{prefix}{semver}$`, then `{prefix}` will be used. For example, setting a
version of `0.0.0.0` will mean `"0."` will be used as prefix. This is the
recommended configuration.

### _workingDirectory_

**Default**: undefined

Change to this directory before doing anything.
