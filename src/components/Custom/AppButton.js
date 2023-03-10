import { actionCreators } from '@actions';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-spinkit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Colors } from '../../constants/colors';
import { AppHeight, AppWidth } from '../../constants/commonStyle';
import AppText from './AppText';

class AppButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	_buttonStyle = () => {
		const { width, bottom } = this.props;
		return {
			width: width ? width : AppWidth._100pr,
			height: AppHeight._60,
			borderRadius: 50,
			bottom: bottom ? bottom : 0,
			justifyContent: 'center',
			backgroundColor: Colors.primary,
			alignItems: 'center',
		};
	};

	render() {
		const { label, fontsize, onClick, containerStyle, top, fontFamily } = this.props;
		return (
			<View style={[containerStyle, { marginTop: top ? top : 0 }]}>
				<TouchableOpacity activeOpacity={0.5} onPress={onClick}>
					<View style={this._buttonStyle()}>
						{this.props.isLoading ? (
							<Spinner size={22} type={'Circle'} color={Colors.snowWhite} />
						) : (
							<AppText
								fontFamily={fontFamily}
								fontsize={fontsize}
								color={Colors.snowWhite}
								label={label} />
						)}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStatetoProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(AppButton);
