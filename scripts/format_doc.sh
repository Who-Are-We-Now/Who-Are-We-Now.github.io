# This file processes each .docx file downloaded from google docs, 
# outputs 
# 1) a .md file with formatting for 11y called index_<file name>
# 2) a .docx file with formatting for importing to in-design
# Args:
# $1 - input docx file name without '.docx' extension, like 'wawn00'

mkdir tmp
cd tmp
pandoc -t markdown-smart --wrap=preserve -o 0_${1}.md ../${1}.docx

sed -e 's!\\\[\\@\([^}]*\)\\\]!\[@\1]!g;s@\\@@g;s/^###\ />\ /g' 0_${1}.md > 1_${1}.md 

# generate .md file with formatted references OR...
# pandoc --wrap=preserve -t markdown-citations --bibliography=../../references.bib --csl=../../chicago-fullnote-bibliography.csl -o 2_${1}.md 1_${1}.md

# sed -e 's@\\@@g' 2_${1}.md > 3_${1}.md

# python ../../process_md.py --input 3_${1}.md --output ../index_${1}.md

src_dir='../../../src'

mkdir ${src_dir}/${1}

# ...OR without citation setting
python ../../process_md.py --input 1_${1}.md --output ${src_dir}/${1}/index.md

# generate .docx file
# TODO -- need to test with properly formatted file

cd ..
rm -rf tmp