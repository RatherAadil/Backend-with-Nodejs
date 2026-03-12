// ...existing code...

# Basics of Terminal — Example: echo, pwd, whoami

This repository contains a minimal example shell script demonstrating basic shell arithmetic and echo usage.

## Files

- [01_echo_pwd_whoami/test.sh](01_echo_pwd_whoami/test.sh) — simple shell script that adds two numbers and prints text.

## test.sh overview

The script defines two variables, adds them, and prints the result followed by the word "End":

echo ->This command is used to print in bash

we can create a variable in bash as well:

```sh
num1=4
num2=6
echo $((num1+num2))  # prints 10
echo End             # prints "End"
```

#To Execute this file write :

```sh
./test.sh
```

```sh
pwd  #prints current working directory
```

```sh
whoami  #prints username
```

## cd

This command is used to change directory (go from one folder to another)

```sh
cd folder_name
cd ../  #one folder up
```

```sh
~  #denotes home directory
```

## ls

List command --> lists all the directories

```sh
ls

ls -a #used to list hidden files
```

## touch

This command is used to create files.
we can create any number of files by providing file names after one another

```sh
touch index.html style.css index.js
```

# mkdir

This command is used to make the folder.

```sh
mkdir src
```

# cp

This command is used to copy files from src to destination

```sh
cp index src
```

# mv

This command is used to move files from src to destination.

```sh
 mv style.css src/
```

we can also rename files with mv

```sh
mv index.js server.js
```

# rm

used to remove file

```sh
rm server.js
```

or we can delete folder with it as well

```sh
rm -r src # -r means recursively delete
```

# rmdir

used to delete folder

```sh
rmdir src
```

# create any number of files in single command

```sh
for i in {1..10}; do touch "app$i.js"; done

#./tesh.sh
```
