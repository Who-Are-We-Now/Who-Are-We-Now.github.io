import unicodedata
import re
from collections import namedtuple
import argparse

parser = argparse.ArgumentParser(description="Format wawn md filese")
parser.add_argument('--input', type=str)
parser.add_argument('--output', type=str)
args = parser.parse_args()

Line = namedtuple('Line', ['text', 'write'])
# TODO: add argparse so it can be reused
f = open(args.input, 'r')
# TODO: add file naming, with dates, etc. once it's added to the codebase
o = open(args.output, 'w')
count = 0 

hbar = "-{5,}"
# see https://en.wikipedia.org/wiki/Non-breaking_space
nbsp = u'0xa0'
refs = "#refs"
in_ref = False
skip_counter = 0
in_bib = False

# Returns true if the line needs to be printed
def replace_first_two_hbar(line):
    line = line.text
    m = re.search(hbar, line)
    global count
    if m is not None:
        # Replace first two ascii hbars with '---'
        if count < 2:
            count += 1
            line = re.sub(hbar, '---', line)
        else:
            # Replace remaining ones with '***', Blaise's original formatting
            line = re.sub(hbar, '***', line)
    return Line(line, True)

def replace_em_dash(line):
    line = line.text
    line = re.sub('---\ ', '---', line)
    return Line(line, True)

def remove_underline_in_links(line):
    line = line.text
    line = re.sub(r'\[(\b.*)\]\{.underline}', r'\1', line)
    return Line(line, True)

def remove_paperpile_links(line):
    line = line.text
    line = re.sub(r'\[([^\[]*)\]\(https?://paperpile.com/(c|b)/\w*/\w*(.*)\)', r'\1', line)
    return Line(line, True)

def remove_bibliography(line):
    line = line.text
    global in_bib

    if "{%bibliography_start%}" in line:
        in_bib = True
        return Line(line, False)
    elif "{%bibliography_end%}" in line: 
        in_bib = False
        return Line(line, False)
    elif in_bib:
        return Line(line, False)
    else:
        return Line(line, True)


# Returns true if the line needs to be printed
def remove_ref_metadata(line):
    line = line.text
    # For removing references metadata
    global skip_counter
    global in_ref
    # Detect start of references
    if refs in line:
        in_ref = True
    
    # Skip the next 3 lines if a '#ref' string is detected
    elif "#ref" in line:
        skip_counter = 3
    elif skip_counter > 0:
        skip_counter -= 1
    
    # Remove final ':::' flag
    elif ":::" and in_ref:
        in_ref = False
    else:
        return Line(line, True)

    return Line(line, False)

if __name__ == '__main__':
    for line in f.readlines():
        write = True
        line_normalized = unicodedata.normalize("NFKD", line)
        line = Line(line_normalized, write)

        line = replace_first_two_hbar(line)
        write &= line.write

        line = replace_em_dash(line)
        write &= line.write

        line = remove_underline_in_links(line)
        write &= line.write

        line = remove_paperpile_links(line)
        write &= line.write

        line = remove_ref_metadata(line)
        write &= line.write

        line = remove_bibliography(line)
        write &= line.write

        if write:
            o.write(line.text)

