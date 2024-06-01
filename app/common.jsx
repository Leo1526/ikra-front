export const url = "https://compact-codex-425018-n7.lm.r.appspot.com";

export const errorInput = (ref) => {
    if (ref && ref.current) {
        ref.current.setNativeProps({
          style: { borderColor: 'red' },
        });
    }
}