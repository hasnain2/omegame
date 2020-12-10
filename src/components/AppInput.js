import * as React from 'react';
import { TextInput } from 'react-native-paper';

const AppInput = ({ value, label, editable, passwordVisible, placeholder, type, right, onRightPress, onChangeText, style }) => {
    let [state, setState] = React.useState({
        inputVal: ''
    })
    return (
        <TextInput
            right={right ? (
                <TextInput.Icon
                    name={() => right}
                    onPress={onRightPress}
                />
            ) : null}
            label={label}
            editable={editable}
            secureTextEntry={passwordVisible || false}
            keyboardType={type === 'email' ? "email-address" : type === 'password' ? 'default' : type === 'decimal' ? 'decimal-pad' : type === 'phone' ? 'phone-pad' : 'default'}
            style={style ? style : { backgroundColor: 'black' }}
            placeholder={placeholder || ''}
            value={value || state.inputVal}
            onChangeText={(val) => {
                setState(prev => ({ ...prev, inputVal: val }))
                onChangeText(val)
            }}
        />
    )
}
export { AppInput };
