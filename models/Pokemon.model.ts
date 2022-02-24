export type Pokemon = {
    id: number;
    name: {
        english: string;
        japanese: string;
        chinese: string;
        french: string;
    };
    type: string[];
    base: {
        HP: number;
        Attack: number;
        Defense: number;
        SP_Attack: number;
        SP_Defense: number;
        Speed: number;
    };
};
