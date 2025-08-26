git init
git add .
git commit -m "Initial commit"
gh repo create closeby --public --source=. --remote=origin
git push -u origin main
