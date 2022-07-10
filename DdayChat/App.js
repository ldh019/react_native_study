import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Setting from './Setting.js';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dday: new Date(),
			ddayTitle: '테스트 디데이',
			chatLog: [],
			settingModal: false,
		}
	}

	toggleSettingModal() {
		this.setState({
			settingModal: !this.state.settingModal
		})
	}

	settingHandler(title, date) {
		this.setState({
			ddayTitle: title,
			dday: date,
		});
		this.toggleSettingModal();
	}

	makeDateString() {
		return this.state.dday.getFullYear() + '년 ' + (this.state.dday.getMonth() + 1) + '월 ' + this.state.dday.getDate() + '일';
	}

	makeRemainString() {
		const distance = new Date().getTime() - this.state.dday.getTime();
		console.log(new Date(), this.state.dday.distance / (1000 * 60 * 60 * 24))
		const remain = Math.floor(distance / (1000 * 60 * 60 * 24));

		if (remain < 0) 
			return 'D' + remain;
		else if (remain > 0)
			return 'D+' + remain;
		else if (remain === 0)
			return 'D-day';
	}

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground
					style = {{width:'100%', height: '100%'}}
					source = {require('./images/background.png')}>
					<View style={styles.settingView}>
						<TouchableOpacity onPress = {() => this.toggleSettingModal()}>
							<Image source = { require('./icon/setting.png') } />
						</TouchableOpacity>
					</View>
					<View style={styles.ddayView}>
						<Text style = {styles.titleText}>
							{this.state.ddayTitle}까지
						</Text>
						<Text style = {styles.ddayText}>
							{this.makeRemainString()}
						</Text>
						<Text style = {styles.dateText}>
							{this.makeDateString()}
						</Text>
					</View>
					<View style={styles.chatView}>
						<ScrollView style = {styles.chatScrollView}>
						</ScrollView>
						<View style = {styles.chatControl} >
							<TextInput style = {styles.charInput} />
							<TouchableOpacity style = {styles.sendButton}>
								<Text>
									전송
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{ this.state.settingModal ? 
					<Setting
						modalHandler = {() => this.toggleSettingModal()}
						settingHandler = {(title, date) => this.settingHandler(title, date)}/> : <></> }
				</ImageBackground>
		  	</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	settingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-end',
		marginRight: '1%',
	},
	ddayView: {
		flex: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	chatView: {
		flex: 6,
		justifyContent: 'flex-end'
	},
	titleText: {
		alignSelf: 'flex-end',
		fontSize: 36,
		fontWeight: 'bold',
		color: '#4A4A4A',
		marginRight: '15%',
	},
	ddayText: {
		fontSize: 100,
		fontWeight: 'bold',
		color: '#4A4A4A',
	},
	dateText: {
		alignSelf: 'flex-start',
		fontSize: 21,
		fontWeight: 'bold',
		color: '#4A4A4A',
		marginLeft: '15%',
	},
	sendButton: {
		backgroundColor: 'yellow',
		backgroundColor: 'rgb(97,99,250)',
		height: 40,
		width: 50,
		borderRadius: 20,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5
	},
	charInput: {
		backgroundColor: 'white',
		width: '75%',
		height: 40,
		borderWidth: 1,
		borderColor: '#a5a5a5',
		borderRadius: 20
	},
	chatControl: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	chatScrollView: {
		width: '90%',
		alignSelf: 'center',
		backgroundColor: 'rgba(201, 201, 201, 0.7)',
		margin: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#a5a5a5',
	}
});