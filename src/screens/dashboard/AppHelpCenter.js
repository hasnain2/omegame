

import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { List } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import { useSelector } from 'react-redux';
import { AppBackButton } from '../../components';
import { AppConfig } from '../../config';


const QAs = [
    {
        section: `USING ${AppConfig.appName.toUpperCase()}`,
        data: [{
            question: `What is ${AppConfig.appName.toUpperCase()}?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `How do I post a picture/video?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `What does it mean to follow someone?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `What is a Quest?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `How do I level up?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Who can see what I post?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `How can I rate a game?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        },]
    }, {
        section: `PRIVACY & SAFETY`,
        data: [{
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }]
    }, {
        section: `NEW CATEGORY`,
        data: [{
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }, {
            question: `Here comes a question or topic?`,
            answer: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content."
        }]
    },
]
const AppHelpCenter = ({ navigation, route, }) => {
    let postID = route?.params?.postID || '';
    let userID = route?.params?.userID || '';
    let [state, setState] = useState({
        loading: false,
        reportText: '',
        reportType: '',
        referenceUrl: ''
    });

    let { user } = useSelector(state => state.root);
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppBackButton navigation={navigation} name={"HELP CENTER"} />
            </View>

            <KeyboardAvoidingScrollView >
                <FlatList
                    data={QAs}
                    renderItem={({ item, index }) => (
                        <List.Section title={item?.section}
                            titleStyle={{ color: 'grey', fontWeight: 'bold', fontSize: RFValue(14) }} >
                            <FlatList
                                data={item?.data || []}
                                renderItem={(props) => (
                                    <List.Accordion
                                        titleStyle={{ color: 'white', fontSize: RFValue(16) }}
                                        title={props?.item?.question}>
                                        <List.Item title={props?.item?.answer} titleNumberOfLines={20} titleStyle={{ color: 'grey', fontSize: RFValue(14) }} />
                                    </List.Accordion>
                                )} />

                        </List.Section>
                    )} />
            </KeyboardAvoidingScrollView>
        </View>
    );
};

export { AppHelpCenter };
