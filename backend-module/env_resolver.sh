function listBundles() {
    # Create dir if not exist
    mkdir -p src/Lupcom

    # Return list of bundles to select menu
    ls_count=$(ls -l src/Lupcom | wc -l)
    if [ "$ls_count" -gt 2 ]; then
        echo "$(ls src/Lupcom)"
    fi
}