# Intent

This repo is meant to be used as a starting point for new Internal UI
applications at Driveway.

> **This Internal UI Template is fully functional and
> [reachable](https://internal-ui-template-v2.dev.driveway.cloud).**

## Table of Contents

- [Scope](#scope)
- [Environments](#environments)
- [Requirements and Tools](#requirements-and-tools)
- [Quick Start](#quick-start)
- [Getting Started](#getting-started)
  - [Troubleshooting](#troubleshooting)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
  - [Modifying Environment Variables](#modifying-environment-variables)
  - [Local Environment Overrides](#local-environment-overrides)
- [A Deeper Look at AAD Protection](#a-deeper-look-at-aad-protection)

## Scope

This repo provides you with the following components with Architectural and
Platform standards baked-in:

- Typescript React Client
- Built with NextJS
- Built with Material UI (MUI)
- Azure Active Directory (AAD) Protection
  - ID Token Acquisition via Login Page
  - **Calling Backend**: Per-API, scope based, silent Access Token Acquisition
  - Claims-based Application Role Guard
  - React Context/Local Storage Persisted Auth State

## Environments

`Internal-UI-Template V2` is deployed in the following environments. Pre-prod sites
are password protected. The password can be found in "Roam Basic Web Auth" in
`1Password`.

- Development: combined development from all teams for the upcoming release
  - <https://internal-ui-template-v2.dev.driveway.cloud>
- UAT/Staging: production-like environment for stakeholder approval before release
  to Production
  - <https://internal-ui-template-v2.uat.driveway.cloud>
- Canary: production environment not visible to end-users - testing should be limited
  here as this environment touches Production data
  - <https://canary.internal-ui-template-v2.driveway.com>
- Production: live site available to public end-users
  - <https://internal-ui-template-v2.driveway.com>

`Internal-UI-Template V2` can also be run on your local machine for development
work on <http://localhost:3000>.

## Requirements and Tools

- [NodeJS](https://nodejs.org/)
- IDE/Code Editor of choice:
  - [Visual Studio Code](https://code.visualstudio.com/) - Most widely used.
  - [IntelliJ](https://www.jetbrains.com/idea/) - For the Java/Kotlin hobbyist.
  - [Neovim](https://neovim.io/) - For the performance nerd.
  - [Emacs](https://www.gnu.org/software/emacs/) - For the grey beards.
- [Sourcetree](https://www.sourcetreeapp.com/) (Optional)

**Note:** For those using `Sourcetree`, you will need to make sure that your
global version of `NodeJS` matches the version in `.nvmrc`:

```bash
nvm alias default "$(cat .nvmrc)"
```

## Quick Start

1. Clone Project to a new Repository
2. Install NodeJS
3. Install IDE/Code Editor
4. Install Dependencies
5. Start Local Development Server

## Getting Started

This project uses [NextJS](https://nextjs.org/) with TypeScript.

```bash
# Step 1. Clone project to a new Repository
# First open a terminal using `bash`, `zsh`, or your shell of choice

git clone git@ssh.dev.azure.com:v3/Lithia-Digital/Driveway%20Architecture/internal-ui-template-v2 <YOUR_PROJECT_NAME>
cd <YOUR_PROJECT_NAME> 
rm -rf .git/
git init -b main
git remote add origin git@ssh.dev.azure.com:v3/Lithia-Digital/Roam/<YOUR_REPO_NAME>

# Step 2. Install NodeJS
# Only needed if you don't already have `NodeJS` or `nvm` already installed
#
# Note: Installing `nvm` via Homebrew is not supported. See `Troubleshooting - Node/NVM`.
#
# If you encounter trouble, see the troubleshooting sections in their
# [install documentation](https://github.com/creationix/nvm#install-script).

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.1/install.sh | bash
nvm install
nvm alias default "$(cat .nvmrc)"

# Step 3. Install IDE/Code Editor
# Most developers should already have this set up, but see `Requirements and
# Tools` for links if you don't.

# Step 4. Install Dependencies

npm i

# Step 5. Start Development Server

npm run dev
```

### Convert template to your project

Now you need to replace template strings with ones unique to your new project.

> Ensure you're using **match case** and you are searching and replacing in the
> entire repo.
>
> **ORDER OF OPERATIONS** is critical to avoid chasing down rename related issues.

1. Replace `Internal-UI-Template` with `<YOUR PROJECT NAME>`, following the same
   convention.
1. Replace `internal-ui-template-v2.dev.driveway.cloud` with your Develop domain.
1. Replace `internal-ui-template-v2.uat.driveway.cloud` with your UAT domain.
1. Replace `internal-ui-template-v2.driveway.com` and
   `canary.internal-ui-template-v2.driveway.com` with your Production and Canary
   domains.
1. Replace `internal-ui-template-v2` with `<YOUR PROJECT NAME>`, following the
   same convention.
1. Replace `internal-api-template` with `<YOUR PROJECT API NAME>`, following the
   same convention.
1. Replace `namespace: internal-templates` with one fitting of the domain your
   new Internal UI is bound in. We want thoughtful namespace names and to get
   away from everything in `default`. Examples: `fulfillment`, `e-commerce`,
   `operations`.
1. Replace `Internal UI Template` with `<YOUR PROJECT NAME>`, following the same
   convention.
1. Update `.env.*` environment files with your per-environment `config`
   values. These are used to populate the `config.ts` object.
1. Move `chart/internal-ui-template` to `chart/<YOUR PROJECT NAME>`.
1. Remove any example code or undesired components (e.g. `exampleApiConfig`, `src/example-apps/`).

## Push your changes

```bash
# Push changes to `main`
git push -u origin --all

# Create and push `develop` branch

git checkout -b develop
git push -u origin
```

## Add PR Validation and Delivery Pipelines

1. Go to the [Pipelines](https://dev.azure.com/Lithia-Digital/Roam/_build)
   section in Azure Devops
1. Click the `All` tab
1. Find or add a folder where the pipeline should live e.g. `Fulfillment
   Platform` or `Operations Platform`
1. Click the vertical kabob menu on the right next to the folder and choose `New
   Pipeline`
1. Choose `Azure Repos Git`
1. Select your new repository
1. Choose `Existing Azure Pipelines YAML File`
1. Choose `/pipelines/pr-validation.yml` and click `Continue`
1. Where it says `Run`, click the arrow and choose `Save`
1. Click the vertical kabob menu and choose `Rename/move`
1. Name the pipeline appropriately, e.g. `<YOUR PROJECT NAME> PR Validation` or
   `<YOUR PROJECT NAME> Delivery`
1. Repeat steps for `/pipelines/delivery.yml`

## Add Branch Policies

1. Find your repository branches in Azure Devops
   (e.g. `https://dev.azure.com/Lithia-Digital/Roam/_git/<REPO-NAME>/branches`)
1. You should see `develop` and `main`
1. Choose the vertical kabob menu next to `develop`
1. Click `Set as default branch`
1. Then click `Branch policies`
1. Scroll down to `Build Validation`
1. Click the `+` icon
1. Search for your `PR Validation` pipeline
1. Change `Build expiration` to `Immediately` and click `Save`
1. Repeat for the `main` branch

You also have some freedom with how you want to enforce policies, but here are
some common choices that differ from the defaults:

- `develop`
  - Limit merge types to `Basic Merge` and `Squash`
  - Check for linked work items: `Required`
  - Check for comment resolution `Required`
  - Automatically included reviewers
- `main`
  - Limit merge types to `Basic Merge` only
  - Require at least one approval on last iteration

## Update Azure Active Directory (AAD) and Role-Based Authentication (RBAC)

Configure [AAD Applications](#aad-application-registration) & [Assign Users/Groups](#rbac).

## Run application and validate

1. Run `npm run dev`
1. Ensure that Login and RBAC is functional.
1. Create and run ADO Pipeline and ensure successful deployment.
1. Ensure that Login and RBAC is functional.
1. Repeat steps 1-4 by doing `npm run build` followed by `npm start`.
1. Build an awesome UI with AAD Protection!

## Optional Steps

- If secrets are required, there are comment placeholders in
  `/pipelines/e2e.yml` indicating where you can reference variable groups
  created in ADO Library, also following a similar pattern to `Driveway-UI`.
  - A Vault pattern is also supported if you rely on Infrastructure as Code to
      populate secrets by providing `vaultNames` to the `cd-jobs` template.

### Troubleshooting

#### Azure Repos Git Access

If you have trouble calling `git clone` from the command line, you may need to
add a SSH key <https://go.microsoft.com/fwlink/?LinkID=715524> or generate a
temporary password using `https` by clicking the `Generate Git Credentials`
button after clicking `Clone` in
[Internal-UI-Template](https://dev.azure.com/Lithia-Digital/Driveway%20Architecture/_git/internal-ui-template-v2).

#### Node/NVM

You should **not** install `nvm` via [Homebrew](https://brew.sh/) as it's [not
supported](https://stackoverflow.com/questions/34718528/nvm-is-not-compatible-with-the-npm-config-prefix-option#comment72339017_35774067)

After successfully installing `NodeJS`, If you are having issues running
the project via `npm run dev`, check the following:

- Try closing and re-opening your terminal
- Check the version of `NodeJS` you are on:

```bash
node -v
```

If you are using a version that doesn't match the `.nvmrc` file in the project,
make sure you run `nvm use` then run `npm run reinstall` to use the correct
version of `NodeJS`.

You'll need to run this from inside the project directory each time you
open a new terminal tab or window to ensure you're using the correct version. A
way around this is to set the default Node version to the desired version once
across all shell sessions.

```bash
nvm alias default "$(cat .nvmrc)"
```

## Available scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with hot-reloading.
- `npm run start`: Runs the app in production mode. Requires `npm run build` to
  have been executed first.
- `npm run build`: Builds the app for production. Requires a `.env.production`
  or `.env.production.local` file to be present.
- `npm test`: Runs [Jest](https://jestjs.io/) unit tests in interactive watch mode.
- `npm run pw:e2e`: Runs [Playwright](https://playwright.dev/) E2E
  tests. Requires `npm run dev` or `npm run start` to be executed first.
- `npm run lint`: Runs [ESlint](https://eslint.org/) on all files.
- `npm run analyze`: Builds and analyzes JS bundle sizes, opening an HTML viewer
  to explore the source maps.

Additionally, there are two git hooks:

- A pre-commit hook that runs the following commands on any files about to be committed:
  - `prettier --write`: Formats code based on Driveway standards
  - `eslint --fix --cache`: Lints and tries to fix any `eslint` issues.
- A pre-push hook that runs `Jest` unit tests based on recent changes.

## Project Structure

```text
chart/                 // Helm charts
eslint-plugin-driveway // Custom lint plugin
pipelines              // Deployment pipelines
public/                // Publicly served files
src/
├── assets/            // Shared image assets
├── component-lib/     // Shared components
├── core/              // Core pages and components
│   ├── components/
│   └── pages/
├── example-apps/      // Example pages and components
│   ├── components/
│   └── pages/
├── guards/            // Shared component guards
├── hooks/             // Shared hooks
├── providers/         // Global providers
├── theme/             // Global theme w/ overrides
└── utils/             // Shared utilities
```

Teams wishing to add or extend shared/global elements should do so within the
existing structure. Area-focused applications, components, hooks, or utilities
should be added under an appropriately named root folder e.g. `inventory` or
`feaure_flags`.

## Routing

Route paths are defined in `src/paths.ts`. Routing is done file structure in `src/pages/`,

Some pages require `Guards` that protect and secure the page from
unauthenticated or unauthorized access. There are three existing guards you can
use: `GuestGuard`, `AuthGuard`, and `RoleBasedGuard`. See each component for
more information, but the basic functionality is to show a loading screen and
then as follows:

- `GuestGuard`: If user is authenticated, redirected the user to `/dashboard`.
- `AuthGuard`: If user is not authenticated (no specific role is required),
  redirected the user to `/login`.
- `RoleBasedGuard`: If user is not authenticated and not a member of the correct
  AAD roles, show a `Permission Denied` page.

## Components & Assets

Shared components are located in `src/component-lib/` and shared assets are in
`src/assets/`.

## Environment Variables

Environment variables are provided to the application by `.env` files. By
default `NextJS` uses `.env.development` for `next dev` and `.env.production` for
`next start`. Since all deployed environments (`Dev`, `UAT`, and `Prod`) use
`next start` we've opted for a different naming scheme. The correct `.env` file
is then applied during pipeline builds.

- `.env.test` is used in unit tests
- `.env.development` is used on PR branches, develop and for local development
- `.env.uat` is used on UAT deploys
- `.env.prod` is used on Prod and Canary deploys

In all cases a `.env.local` file being present would override these values so
this can be used to target locally running API endpoints. This file is ignored
by git.

Many of the `.env` values are available via a global `Config` object, which is
compiled at build-time and available from `src/config.ts`:

### Modifying Environment Variables

To add, modify, or remove an environment variable:

- Edit each `.env.*` file and add, edit, or remove the appropriate line. If you
  want the variable available on the client, prefix it with `NEXT_PUBLIC_`.

```bash
# ...Existing env vars
MY_VARIABLE="some value" # Server-only variable
NEXT_PUBLIC_OTHER_VAR="something else" # Client variable
```

- If adding, modifying, or removing a client variable, edit `src/config.ts` to
  add/edit/remove a line to the `config` object, e.g.

```typescript
// ...Existing env vars
myOtherVar: process.env.NEXT_PUBLIC_MY_OTHER_VAR || "default value"`
```

### Local Environment Overrides

You can override environment variables for local development temporarily via the
command-line:

```bash
NEXT_PUBLIC_BUY_API_PATH=http://localhost:3000 npm run dev
```

Or by creating a persistent `.env.local` override file:

```bash
# .env.local
NEXT_PUBLIC_BUY_API_PATH=http://localhost:3000
```

## A Deeper Look at AAD Protection

### AAD Application Registration

Think of an AAD Application **like** a mix of an Auth0 Application, Auth0 API
and an AAD Service Principal. An AAD Application can expose `App Roles`, `API
Scopes`, `Client Credentials`, `Branding`, `Token Configuration` and more. Take
a look at Microsoft's
[documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-how-applications-are-added)
for an exhaustive look.

> **Important**: Your new Internal UI requires its own, new AAD Application
> Registration. Use this as a starting point to gain an understanding of how it
> works.
>
> **Doubly Important**: Explore AAD Application Registrations in your teams
> Driveway Sandbox. When you are ready to leave the sandbox, seek Architectural
> Review and request that a new AAD Application Registration is created for
> Lithia.com.

Each AAD Application has a corresponding AAD `Enterprise Application` and it is
necessary to use in order to assign AAD Users/Groups to `App Roles` for your
Internal UI. Driveway Garage can be used to create new groups and add/remove
users from them.

> **Careful**: Microsoft has a way of doing things... AAD `Enterprise
> Applications` are also used to create and configure Lithia.com SSO for
> **Third-Parties**. This is not that.

---

This template uses
[this](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/Overview/quickStartType//sourceType/Microsoft_AAD_IAM/appId/6cb0ec3f-c07f-4815-9294-d340cd3c4f0c/objectId/d95978bf-2b89-4c1c-8a0a-43ba59716a34/isMSAApp//defaultBlade/Overview/appSignInAudience/AzureADMyOrg/servicePrincipalCreated/true)
specific AAD Application Registration.

The application is configured as a SPA with redirect URIs for:

- `http://localhost:3000/blank.html`
- `https://internal-ui-template-v2.dev.driveway.cloud/blank.html`

> `blank.html` pattern is recommended by Microsoft for performance reasons.

The application is configured with one App Roles. App Roles are provided as
claims when acquiring a token from AAD. See the following:

- `App.User`: App users have the ability to view the protected app page.

> **Important**: Before you write any code, build an RBAC Matrix. This is
> critical to thinking RBAC-first and building secure functionality with easy to
> understand authorization.

The template is configured with it's AAD Application Registration details in
`./src/authConfig.ts`.

> No secrets are required by the app. Just Client ID, Authority and Redirect URI.

## RBAC

**Important**: `Scopes` determine how much access the application has to the
user's data. `Roles` determine how much access the user has to the application.

### Scopes

In order to expose an API in an AAD Application, a minimum of one scope must be
created. There currently is only one use case for Internal APIs at Driveway to
use `Scopes`. When we login, we use basic user OIDC scopes for the user through
the Microsoft Graph APIs.

However, when we acquire tokens for Internal APIs - we need to allow the
Internal APIs to Read User data, since users are calling the APIs. Our default
scope for each Internal API is `access_as_user` and the Internal UI should be
pre-consented to use the Internal API scope `access_as_user`.

### Roles

In order to control user access to Internal UI and Internal API functionalities,
`App Roles` can be defined for both the Internal UI and the Internal APIs. We
will be keeping it simple, and using the same convention for API and UI roles.

### Groups

In order to assign Lithia.com users to the Internal UI and Internal API `App
Roles`, AAD Groups are created and assigned to a specific role in an AAD
Application's Enterprise Application.

**Important**: It is critical that both the UI and API `App Roles` stay in
sync. You don't want someone presented with a UI only for the API calls to
fail. Until this is automated, it will be annoying.

### Example RBAC Matrix

Below is an example RBAC Matrix:

| Domain        | API Role                    | UI Role                     | Group                                   |
| ------------- | --------------------------- | --------------------------- | --------------------------------------- |
| Inventory     | Inventory.Suppression.User  | Inventory.Suppression.User  | Driveway_Inventory_Users_Dev            |
| Inventory     | Inventory.Suppression.Write | Inventory.Suppression.Write | Driveway_Inventory_Administrators_Dev   |
| Inventory     | Inventory.Sync.Reader       | Inventory.Sync.Reader       | Driveway_Inventory_Users_Dev            |
| Inventory     | Inventory.Sync.Operator     | Inventory.Sync.Operator     | Driveway_Inventory_Administrators_Dev   |
| Feature Flags | FeatureFlag.Reader          | FeatureFlag.Reader          | Driveway_FeatureFlag_Users_Dev          |
| Feature Flags | FeatureFlag.Administrator   | FeatureFlag.Administrator   | Driveway_FeatureFlag_Administrators_Dev |

The example assumes there are three components:

1. A UI Application
   - Has `access_as_user` scope for each API Application configured for API Permissions.
   - Has each UI Role defined from the table above.
2. An Inventory API Application
   - Has `access_as_user` scope, pre-consented to UI Application.
   - Has only the Inventory domain API Roles defined from the table above.
3. A Feature Flags API Application
   - Has `access_as_user` scope, pre-consented to UI Application.
   - Has only the Feature Flags domain API Roles defined from the table above.

## Calling Backend

This template assumes that:

1. All backend calls will go through APIs in the relevant domain and the UI will
   not directly call a backend dependency.
2. Backend endpoints used by Internal UIs are also protected by AAD. (See internal-api-template.)
3. Backend endpoints protected by AAD also validate scope(s).
4. Backend AAD Applications with scopes are pre-authorized for use by your new
   Internal UI's AAD Application.
   > **Important**: This will ensure that users aren't prompted on login for
   > consent of each internal API scope.
