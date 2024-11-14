import * as st from 'simple-runtypes';

export const preCardboardArrayVersion = st.record({
    name: st.string(),
    author: st.string(),
    sideName: st.record({
        front: st.string(),
        back: st.string(),
    }),
    cardboards: st.array(
        st.record({
            front: st.string(),
            back: st.string(),
        })
    ),
});

export const PreVersioningVersion = st.record({
    name: st.string(),
    author: st.string(),
    sideName: st.record({
        front: st.string(),
        back: st.string(),
    }),
    cardboards: st.array(
        st.record({
            front: st.array(st.string()),
            back: st.array(st.string()),
        })
    ),
});

export const Version0_1 = st.record({
    name: st.string(),
    author: st.string(),
    sideName: st.record({
        front: st.string(),
        back: st.string(),
    }),
    version: st.literal('0.1'),
    flashcards: st.array(
        st.record({
            front: st.array(st.string()),
            back: st.array(st.string()),
        })
    ),
});
