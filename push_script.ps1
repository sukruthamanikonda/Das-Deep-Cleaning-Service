$GitPath = "C:\Program Files\Git\cmd\git.exe"

& $GitPath config user.email "sukruthamanikonda@example.com"
& $GitPath config user.name "Sukrutha Manikonda"
& $GitPath add .
& $GitPath commit -m "Add updated code for deep cleaning service"
& $GitPath branch -M main
& $GitPath remote -v
& $GitPath remote remove origin
& $GitPath remote add origin https://github.com/sukruthamanikonda/Das-Deep-Cleaning-Service.git
& $GitPath push -u origin main
