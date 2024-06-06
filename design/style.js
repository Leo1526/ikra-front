import { colors, text } from '../design/themes';
import { StyleSheet } from 'react-native';

export const commonStyle = {
  input: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    borderTopWidth: 0,
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    marginBottom: 16,
    backgroundColor:colors.background
  },
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor:colors.background,
    paddingHorizontal: 10,
    padding:10
  },  
  primaryButton: {
    width: '100%',
    marginTop: 10,
    textAlign: 'center',
    padding: 2,
    backgroundColor: colors.primary,
    marginBottom: 16,
    borderRadius: 16
  },
  primaryButtonLabel: {
    color: text.primaryLight,
    fontWeight: 'light',
    fontSize: 16,
    letterSpacing: 2,
    padding:4
  },
  secondaryButton: {
    textAlign: 'center',
    backgroundColor: colors.background,
    borderRadius: 10,
    fontSize: 16,
    letterSpacing: 2,
    colors: colors.primary,
    fontWeight: '500',
    borderColor: colors.primary,
    borderWidth: 1
  },
  secondaryButtonLabel: {
    color: colors.primary,
    fontWeight: '500'
  },
  errorText: {
    marginBottom: 8,
    color: 'red',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background,
  },
  text: {
    primaryDark: '#222222',
    primaryLight: '#FFFFFF',
    secondaryDark: '#555555',
    secondaryLight: '#CCCCCC',
  },
  generalText:{
    fontsize: 16,
    color: colors.text
  },
  textLabel: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
  },
};
