# SillyTavern Keyboard Reflow Fix

Fixes delayed chat box collapse when closing the Android keyboard (especially on Samsung Keyboard + Native Alpha / WebView).

## What it does
- Detects Android keyboard close via visualViewport
- Forces immediate chat UI reflow
- Removes lag between keyboard closing and input box collapsing
- Disables transition delay during reflow

## Install (GitHub URL method)

1. Go to SillyTavern
2. Settings → Extensions
3. Paste GitHub repo URL: