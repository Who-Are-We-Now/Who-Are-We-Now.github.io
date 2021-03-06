# Markdown commands
The `make_wawn.py` script builds the entire book as `.md` and `.docx` files from the Google Docs files. There are a few commands you can specify inline in the Google Docs:

**Remove bibliography**
Because Paperpile automatically adds a bibliography to the end of the document, place `{%bibliography_start%}` and `{%bibliography_end%}` around it to remove it.

**Skip a block of text**
Wrap a block of text with `{%skip_start%}` and `{%skip_end%}` to make the block of text disappear. This can be useful in case there's something in the manuscript we wish not to see in the final output.

# Building the book
To build the book, which generates all the markdown files per chapter (and soon all `.docx` files), you must simply run the `make_wawn.py` file within this directory (`/scripts`):

```
python3 make_wawn.py
```

It will add formatted markdown files to the `/src` directory of this repository according to the following file structure:

```
docs
src
  | introduction
  |    | index.md
  | chapter-01
  |    | index.md
  |
  .... 
book
  | .docx files go here
package.json
REAME.md
```

# Setting up
Follow these instructions to set up the wawn build script.

## Install dependencies

Install the Google Drive API

```
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

Install Pandoc for document formatting
```
brew install pandoc
```

_I believe that's it for now. Give it a try, and contact me if it doesn't work for some reason and we can debug it together, as I haven't tried reproducing these steps on another system yet._

## Download auth token
To use the `make_wawn.py` book build script, download this auth file from the [wawn google drive](https://drive.google.com/file/d/1C3bGZjqLHTvEZ31-EWr1rfOrlE_MT16Q/view?usp=sharing).

Note where you've saved the file, e.g., in this directory, and then update the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.

Add to your `.bashrc`, `.bash_profile`, or paste directly into your Terminal:
```
export GOOGLE_APPLICATION_CREDENTIALS="/<path to credentials file>/wawn-354614-cf71ca21de3c.json"
```

I've added `wawn-354614-cf71ca21de3c.json` to the `.gitignore` file so it doesn't accidentally get pushed to the repo.

More details here about setting up credentials: [https://cloud.google.com/docs/authentication/getting-started](https://cloud.google.com/docs/authentication/getting-started)

## Want to add another chapter to the script?
- Invite this email to the relevant google doc: `wawn-214@wawn-354614.iam.gserviceaccount.com`
- Add an additional chapter entry to `chapters.json`
