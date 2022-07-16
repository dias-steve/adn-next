import ResultSearchItem from "../../components/search/ResultSearchItem/ResultSearchItem.js";
export default {
    title:"Component/Search/ResultSearchItem",
    component:ResultSearchItem,
    argTypes: {

       title: { control: 'text' },
       isPortrait: { control: 'boolean' },
       imgURL: { control: 'text' },
       imgAlt: { control: 'text' },
      },

};

export const ResultSearchItemStory = (args) => <ResultSearchItem 
    thumnail= {{
        url: args.imgURL,
        alt: args.imgAlt,

        }}{...args}/>;