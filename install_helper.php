<?php
echo "<pre>";
echo "<b>Node Manual Installer</b>\n";
echo "Current Folder: " . getcwd() . "\n";

// Check if package.json exists here
if (!file_exists('package.json')) {
    echo "WARNING: package.json not found in this folder!\n";
    echo "Please upload this file to the folder containing package.json.\n\n";
}

echo "Running 'npm install'...\n";
// Run npm install and capture output
// 2>&1 ensures we see errors too
$output = shell_exec('npm install 2>&1');
echo $output;

echo "\nDone.";
echo "</pre>";
?>
