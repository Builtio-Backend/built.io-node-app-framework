[
    {
        "route":"/blog",                //Any request with /blog will be proxied to host raweng.com/blog as mentioned below
        "host":"raweng.com",
        "path":"blog",
        "port":"80",
        /*  before:
            Hook before making a proxy call.
            This will execute the function given here. Eg: {ControllerName}.{ActionName}(Optional)
            Eg: controllers/proxy-events.js -> before
        */
        "before":"proxy-event.before",
        "after":"proxy-event.after"",   //Event emitted after reciving a proxy response. (Optional)
        "error":"proxy-event.error"     //Event emitted when Proxy call returns any error. (Optional)

     },
     {
        "route":"/raw",
        "host":"raweng.com",
        "port":"80",
        "before":"proxy-event.before",
        "after":"proxy-event.after",
        "error":"proxy-event.error"
    }
]

