# ApartEase-Frontend

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


# Git Command Line Cheat Sheet

```sh
## Create Repository
mkdir new-repository

## Create File
touch filename.txt

# Commit Changes
git add . && git commit -m "Your commit message"

# Push the File to the Remote Repository
git add filename.txt && git commit -m "Add filename.txt" && git push origin branch-name

# Pull the File from the Remote Repository
git pull origin branch-name

# Checkout or Switch Branch
git checkout branch-name
or
git switch branch-name

# View Branches
git branch

# View Tags
git tag

# Create Branch
git branch new-branch

# Create Tag
git tag v1.0.0

# Merge to dev Branch
git checkout dev && git merge branch-name

# Push Tag to Remote Repository
git push origin v1.0.0

# Rename Branch
git branch -m old-branch-name new-branch-name

# Rename Tag
# Git does not support renaming tags directly. You need to create a new tag and delete the old one:

git tag new-tag old-tag && git tag -d old-tag && git push origin :refs/tags/old-tag && git push origin --tags

# Rename or Update Name of File
git mv old-filename.txt new-filename.txt

# Delete File
git rm filename.txt

# Delete Branch
git branch -d branch-name

# Delete Tag
git tag -d v1.0.0

```





## Project Documentation

### Project Overview
[Click here to view Project Overview](./Project_Docs/overview.jpg)

### UI Design


#### Login Page

![Alt text](./Project_Docs/UI/UI01.jpeg)

#### Signup Page
![Alt text](./Project_Docs/UI/UI-02%20Login%20Sucessful%20Modal.jpeg)

#### Home page
![Alt text](./Project_Docs/UI/UI-03%20Home%20page.jpeg)

#### Profile Page
![Alt text](./Project_Docs/UI/UI-04%20Profile%20Page.jpeg)

#### Resident Page
![Alt text](./Project_Docs/UI/UI-05%20Resident%20Page.jpeg)

#### Resident Create Modal
![Alt text](./Project_Docs/UI/UI-06%20Resident%20Create%20Modal%20.jpeg)

#### Resident Update Modal
![Alt text](./Project_Docs/UI/UI-07%20Resident%20Update%20Modal.jpeg)
#### User Page

![Alt text](./Project_Docs/UI/UI-08%20User%20Page.jpeg)
#### User Create Modal

![Alt text](./Project_Docs/UI/UI-09%20User%20Create%20Modal.jpeg)
#### User Update Modal
![Alt text](./Project_Docs/UI/UI-10%20User%20Update%20Modal.jpeg)
#### Role Page
![Alt text](./Project_Docs/UI/UI-11%20Role%20page.jpeg)

#### Role Create Modal
![Alt text](./Project_Docs/UI/UI-12%20Role%20Create%20Modal.jpeg)

#### Role Update Modal
![Alt text](./Project_Docs/UI/UI-13%20Role%20Update%20Modal.jpeg)

#### Delete Modal
![Alt text](./Project_Docs/UI/UI-14%20Delete%20modal.jpeg)

#### Unit Management Page
![Alt text](./Project_Docs/UI/UI-15%20Unit%20Management%20page.jpeg)

#### Unit Update Modal
![Alt text](./Project_Docs/UI/UI-16%20Unit%20Update%20Modal.jpeg)

#### Bill Page
![Alt text](./Project_Docs/UI/UI-17%20Bill%20page%20.jpeg)

#### Bill History
![Alt text](./Project_Docs/UI/UI-18%20Bill%20History.jpeg)

#### Bill History View Modal
![Alt text](./Project_Docs/UI/UI-19%20Bill%20History%20View%20Modal.jpeg)

#### Upload Page
![Alt text](./Project_Docs/UI/UI-20%20Upload%20page.jpeg)



