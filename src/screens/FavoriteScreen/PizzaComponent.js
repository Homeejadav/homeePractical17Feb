import { actionCreators } from '@actions';
import React from 'react';
import { BackHandler, StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets';
import { Colors } from '../../constants/colors';
import { AppMargin } from '../../constants/commonStyle';

class PizzaComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	render() {
		const { navigation, data, onItemPress } = this.props;
		return (
			<ImageBackground style={{ flex: 1 }}>
				<View style={{ height: 80, borderRadius: 20, bottom: 0, right: 0, position: 'absolute', width: '80%', backgroundColor: Colors.borderColors }} />
				<TouchableOpacity onPress={onItemPress} style={{ height: 120, flexDirection: 'row', alignItems: 'center', width: '100%', }}>
					<Image style={{ height: 160, width: 160, }} source={data.icon} />
					<View style={{ width: '80%', top: 25, left: -30 }}>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: Colors.primary, fontFamily: Fonts.BOLD }}>{data.name}</Text>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: Colors.primary, fontFamily: Fonts.REGULAR }}>{data.type}</Text>
						<Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: Colors.primary, fontFamily: Fonts.BOLD }}>${data.price}.00</Text>
					</View>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}


const styles = StyleSheet.create({
});

const mapStatetoProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(PizzaComponent);
