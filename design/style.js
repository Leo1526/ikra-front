import { colors } from '../design/themes';

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
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
  },
  secondaryButton: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.secondary,
    marginBottom: 16,
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
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
