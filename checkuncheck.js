$(document).mouseup(function (e)
{
    var container = $("selector to dropdown list");

    if (!container.is(e.target) // if clicked outside
        && container.has(e.target).length === 0)nor a descendant of the container
    {
        container.hide();
        $( "#check" ).prop( "checked", false ); //to uncheck
    }
});