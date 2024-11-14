enum SetOfFlashcardsVersion {
    PreCardboardArray, // format for cardboards: [{"front": string, "back": string}]
    PreVersioning, // format for cardboards: [{"front": Array<string>, "back": Array<string>}]
    Version0_1, // rename cardboards to flashcards, add "version": string
}

export default SetOfFlashcardsVersion;
