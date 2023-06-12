633d9774-62e0-4aff-8592-9b42cb8aa506
n4X4PazyawI9-_7CUXgsFPP6CC9twO6-irhcgPeHKjwr_sg4U8tyQ1veLFcEeemj



# Git global setup
git config --global user.name "Thanh Thùy"
git config --global user.email "lntt.thuy@gmail.com"


# Create a new repository
git clone https://gitlab.com/stid-dev/fido-projects/fido2_server_fe.git
cd fido2_server_fe
git switch -c main
touch README.md
git add README.md
git commit -m "add README"

# Push an existing folder
cd existing_folder
git init --initial-branch=main
git remote add origin https://gitlab.com/stid-dev/fido-projects/fido2_server_fe.git
git add .
git commit -m "Initial commit"

# Push an existing Git repository
cd existing_repo
git remote rename origin old-origin
git remote add origin https://gitlab.com/stid-dev/fido-projects/fido2_server_fe.git