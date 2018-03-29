var mainSearchInput = document.getElementById('mainSearchInput');


if (mainSearchInput != null) {
    mainSearchInput.onkeypress = function (e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13') {

            var searchValue = $(this).val();
            //console.log(searchValue);

            window.location.href = '/Search-Results?Search=' + searchValue;
            return false;
        }
    };
}
