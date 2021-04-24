const fs = require("fs")
const util = require("util")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note));
    }

    getNotes() {

        return this.read().then((notes) => {
            return JSON.parse(notes);
        });
    }
    //creates new note from db.json template
    saveNote(note) {
        let savedNote = {
            title: note.title,
            text: note.text,
        };

        return this.getNotes()
        .then((notes) => [...notes, savedNote])
        .then((newNote) => this.write(newNote))
        .then(() => savedNote);

    }
   
}

module.exports = new Store();