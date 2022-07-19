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
book_dir='../../../book'
scripts_dir='../../'

mkdir -p ${src_dir}/${1}

# ...OR without citation setting
python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${src_dir}/${1}/index.md --chapters_file ${scripts_dir}/chapters.json

# generate .docx file
# TODO -- need to test with properly formatted file

python ../../process_md.py --input 1_${1}.md --chapter ${2} --output ${book_dir}/${1}.md --chapters_file ${scripts_dir}/chapters.json --book True
pandoc --lua-filter=${scripts_dir}/stripmeta.lua -o ${book_dir}/${1}.docx --reference-doc=${scripts_dir}/custom-reference.docx ${book_dir}/${1}.md 
rm ${book_dir}/${1}.md

cd ..
rm -rf tmp