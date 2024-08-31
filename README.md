# SUCU

Web Application for SUCU's website.

## Prerequisites

Please install the following.
-   [Node.js](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/)
-   [Git](https://git-scm.com/)

This project use [Svelte](https://svelte.dev/docs/) and [TailwindCSS](https://tailwindcss.com/) as CSS Framework.

For front-end design you can see in [SUCU's Figma](https://www.figma.com/design/aRYzEyHTPTkB4eXK3T0WUA/SUCU-Website-Project?node-id=100-903&t=5cADlqPwyjmxeQOG-1). You can download all resources in figma too.

## Getting Started

1. Clone this repository


```bash
# Using SSH (recommended)
git clone git@github.com:isd-sgcu/sucu-frontend-2024.git

# Using Https (not recommended)
https://github.com/isd-sgcu/sucu-frontend-2024.git
```

2. Go to project folder
```bash
cd sucu-frontend-2024
```

3. Install all dependencies
```bash
pnpm install
```

4. Run
```bash
pnpm dev
```

5. Go to [http://localhost:5173](http://localhost:5173) in your fav browser.

## Contributing

We will seperate a branch for each features and each person then, create pull request for combine code together.

1. Go to `dev` branch and pull updated code
```bash
git checkout dev

git pull
```

2. Create branch and go to your branch
```bash
git branch {your_branch_name}

git checkout {your_branch_name}
```
> Note : exmaple of {your_branch_name} is boom/feat/pet-card, aungpao/refactor/main-page

3. Push your branch upstream
```bash
git push --set-upstream origin {your_branch_name}
```

4. Working with your code

5. Stage and commit your changes
```bash
git add .

git commit -m {commit_message}
```

6. Push your code in to your branch
```bash
git push
```

7. Create pull request to `dev` branch in github
8. Wait for the code to be reviewed and merged

### Conventional Commit Format

In short, the commit message should look like this:

```bash
git commit -m "feat: <what-you-did>"

# or

git commit -m "fix: <what-you-fixed>"

# or

git commit -m "refactor: <what-you-refactored>"
```

The commit message should start with one of the following types:

-   feat: A new feature
-   fix: A bug fix
-   refactor: A code change that neither fixes a bug nor adds a feature
-   style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)

For more information, please read the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/) documentation.
