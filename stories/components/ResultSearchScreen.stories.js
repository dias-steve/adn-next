
import ResultSearchScreen from "../../components/search/ResultSearchScreen/ResultSearchScreen";

export default {
    title:"Component/Search/ResultSearchScreen",
    component: ResultSearchScreen,
    argTypes:{
        isLoading:  { control: 'boolean' }
    },

};


const resultat = {
    "post_types_found": [
        "product","shootbooks", "general_info","collections"
    ],
    "general_info": [
        {
            "id": 188,
            "title": "Shootbooks",
            "post_type": "shootbooks",
            "thumnail_post": {
                "url": "/vercel.svg",
                "alt": "Femme habillée en noir"
            },

        }
    ],
    "collections": [
        {
            "id": 188,
            "title": "Shootbooks",
            "post_type": "shootbooks",
            "thumnail_post": {
                "url": "/vercel.svg",
                "alt": "Femme habillée en noir"
            },

        }
    ],
    "shootbooks": [
        {
            "id": 188,
            "title": "Shootbooks",
            "post_type": "shootbooks",
            "thumnail_post": {
                "url": "/vercel.svg",
                "alt": "Femme habillée en noir"
            },

        }
    ],
    "product": [
        {
            "id": 188,
            "title": "Black ER12",
            "post_type": "product",
            "thumnail_post": {
                "url": "/vercel.svg",
                "alt": "Femme habillée en noir"
            },
            "categories": [
                37,
                35
            ]
        },
        {
            "id": 188,
            "title": "Black ER12 5",
            "post_type": "product",
            "thumnail_post": {
                "url": "/vercel.svg",
                "alt": "Femme habillée en noir"
            },
            "categories": [
                37,
                35
            ]
        }

    ]
}
export const Template = (args) => <ResultSearchScreen {...args}
    
/>


export const WithResult = Template.bind({});
WithResult.args = {
    resultat: resultat
};

export const WithNotResult = Template.bind({});
WithNotResult.args = {
    resultat: 
        {
            "post_types_found": [],
            "general_info": [],
            "collections": [],
            "shootbooks": [],
            "product": []
        }
    
};