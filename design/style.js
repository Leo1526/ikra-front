import { colors, text } from '../design/themes';

export const commonStyle = {
  input: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#F4F6F8',
    borderRadius: 8,
    borderTopWidth: 0,
    letterSpacing: 2,
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
    borderWidth: 1,
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
};
