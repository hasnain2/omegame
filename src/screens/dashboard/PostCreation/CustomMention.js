import React, {useState} from 'react';
import {View, Pressable,Text} from 'react-native';
import { MentionInput } from 'react-native-controlled-mentions';
  const renderSuggestions =({keyword, onSuggestionPress}) => {
    const suggestions = [
        {id: '1', name: 'David Tabaka'},
        {id: '2', name: 'Mary'},
        {id: '3', name: 'Tony'},
        {id: '4', name: 'Mike'},
        {id: '5', name: 'Grey'},
      ];
    if (keyword == null) {
      return null;
    }
  
    return (
      <View style={{position: 'absolute', top: 0, left: 0,backgroundColor: 'red', width: "100%"}}>
        {suggestions
          .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
          .map(one => (
            <Pressable
              key={one.id}
              onPress={() => onSuggestionPress(one)}
  
              style={{padding: 12}}
            ><View style={{position: 'absolute', backgroundColor:'red', top: 100}}>
              <Text style={{color: "white", backgroundColor: "white"}}>{one.name}</Text>
              </View>
            </Pressable>
          ))
        }
      </View>
    );
  };
const CustomMention = ()=>{
    const [value, setValue]=useState("Type here ...");
return(
<View>
<MentionInput
  value={value}
  onChange={setValue}
  style={{color: 'white'}}
  partTypes={[
    {
      trigger: '@', // Should be a single character like '@' or '#'
      renderSuggestions,
      textStyle: {fontWeight: 'bold', color: 'white'}, // The mention style in the input
    },
  ]}
/>
</View>
)
}
export default CustomMention;
