{
    "post":[
        ["/","main.create"]
    ],
	"get":[
        ["/","main.index"]
    ],
	"put":[
        ["/","main.update"]
    ],
	"delete":[
        ["/","main.destroy"]
    ],
    "resource":[
        ["/blog","resource-blog"] // This will map all the CRUD request on /blog to the action of controller name "controllers/resource-blog.js"
    ]
}


