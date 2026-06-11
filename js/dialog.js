//#region Dialog-----------------------------------------------------------------------
function openDialog(index) {
    const PkmDialog = document.getElementById("card-dialog");
    updateDialog();
    document.body.style.overflow = "hidden";
    dialog.showModal();
}

function closeDialog() {
    const PkmDialog = document.getElementById("card-dialog");
    document.body.style.overflow = "auto";
    dialog.close();

    function updateDialog() {
    const dialogCard = document.getElementById("dialogContent");
    fetchPokemon();
}
}

function leftBtn() {
    currentPkmCardIndex--;
    if (currentPkmCardIndex < 0) {
        currentPkmCardIndex = allPokemon.length - 1;
    }
    updateDialog();
}

function rightBtn() {
    currentPkmCardIndex++;
    if (currentPkmCardIndex >= allPokemon.length) {
        currentPkmCardIndex = 0;
    }
    updateDialog();
}

document.addEventListener("keydown", function(e) {
    if (dialog.open) {
        if (e.key === "Enter") {
            rightBtn();
        }
        if (e.key === "ArrowLeft") {
            leftBtn();
        }
        if (e.key === "ArrowRight") {
            rightBtn();
        }
    }
});
// #endregion-------------------------------------------