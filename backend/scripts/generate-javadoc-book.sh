#!/bin/bash
OUTPUT_DIR=target/reports/pdf
HTML_DIR=target/reports/apidocs
BOOK_FILE=$OUTPUT_DIR/javadoc.book

mkdir -p $OUTPUT_DIR

# Cabecera del .book
echo "[book]" > $BOOK_FILE
echo "title=Javadoc Documentation" >> $BOOK_FILE
echo "output=$OUTPUT_DIR/javadoc-htmldoc.pdf" >> $BOOK_FILE
echo "" >> $BOOK_FILE

# Añadir overview primero
if [ -f "$HTML_DIR/overview-summary.html" ]; then
    echo "$HTML_DIR/overview-summary.html" >> $BOOK_FILE
fi

# Añadir package-summary.html y todos los demás HTML
find $HTML_DIR -type f -name 'package-summary.html' -o -name '*.html' \
    | grep -v 'overview-summary.html' \
    | sort >> $BOOK_FILE