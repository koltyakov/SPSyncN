param($installPath, $toolsPath, $package, $project)

<#
function MarkDirectoryAsCopyToOutputRecursive($item)
{
    $item.ProjectItems | ForEach-Object { MarkFileASCopyToOutputDirectory($_) }
}

function MarkFileASCopyToOutputDirectory($item)
{
    Try
    {
        Write-Host Try set $item.Name
        $item.Properties.Item("CopyToOutputDirectory").Value = 2
    }
    Catch
    {
        Write-Host RecurseOn $item.Name
        MarkDirectoryAsCopyToOutputRecursive($item)
    }
}

MarkDirectoryAsCopyToOutputRecursive($project.ProjectItems.Item("auth"))
#>

## Add Node-Edge dependencies to Git

Try
{
    $projectFullName = $project.FullName
    $fileInfo = new-object -typename System.IO.FileInfo -ArgumentList $projectFullName
    $projectDirectory = $fileInfo.DirectoryName

    Write-Host "Trying to add Edge to Git"
    cd $projectDirectory
    git add --force ./edge/x64/*.*
    git add --force ./edge/x86/*.*
}
Catch
{
}