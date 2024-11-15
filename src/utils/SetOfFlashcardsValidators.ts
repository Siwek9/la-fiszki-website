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
    version: st.optional(st.literal('0.1')),
    flashcards: st.array(
        st.record({
            front: st.array(st.string()),
            back: st.array(st.string()),
        })
    ),
});

export const ReadyToBeExported = st.record({
    name: st.string({minLength: 1, maxLength: 70, trim: true}),
    author: st.string({minLength: 1, maxLength: 50, trim: true}),
    sideName: st.record({
        front: st.string({minLength: 1, maxLength: 30, trim: true}),
        back: st.string({minLength: 1, maxLength: 30, trim: true}),
    }),
    version: st.optional(st.literal('0.1')),
    flashcards: st.array(
        st.record({
            front: st.array(st.string({minLength: 1, maxLength: 300, trim: true}), {minLength: 1}),
            back: st.array(st.string({minLength: 1, maxLength: 300, trim: true}), {minLength: 1}),
        }),
        {minLength: 1}
    ),
});
