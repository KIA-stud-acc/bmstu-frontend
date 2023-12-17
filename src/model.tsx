export interface Voting {
    id: number
    name: string
    type: string
    status: string
    image_src: string
}

export interface VoteList {
    draftID: number
    voting: Voting[]
}


export const mockVoteList: VoteList = 
{
	"voting": [
		{
			"id": 5,
			"name": "Юность",
			"type": "Сквер",
			"status": "действует",
			"image_src": ""
		},
		{
			"id": 1,
			"name": "Лесной оазис",
			"type": "парк",
			"status": "действует",
			"image_src": "https://i.pinimg.com/originals/8d/31/44/8d31440ebf18d6588c4e005a0c187240.png"
		},
		{
			"id": 3,
			"name": "Станция удобства",
			"type": "остановка общественного транспорта",
			"status": "действует",
			"image_src": "https://free-png.ru/wp-content/uploads/2021/12/free-png.ru-272.png"
		},
		{
			"id": 2,
			"name": "Цветущий уголок",
			"type": "парк",
			"status": "действует",
			"image_src": "https://papik.pro/grafic/uploads/posts/2023-04/1681531322_papik-pro-p-logotip-derevo-vektor-3.jpg"
		}
	],
	"draftID": 0
}