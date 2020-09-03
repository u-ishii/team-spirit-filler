#!/bin/sh
SCRIPT=`cat src/fill-remarks.js`
echo "javascript:(() => {${SCRIPT}})()"
