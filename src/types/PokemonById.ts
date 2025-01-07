export interface PokemonById {
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    game_indices: GameIndex[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    past_types: PastType[];
    species: Resource;
    sprites: Sprites;
    stats: Stat[];
    types: Type[];
    weight: number;
  }
  
  interface Ability {
    ability: Resource;
    is_hidden: boolean;
    slot: number;
  }
  
  interface Form {
    name: string;
    url: string;
  }
  
  interface GameIndex {
    game_index: number;
    version: Resource;
  }
  
  interface HeldItem {
    item: Resource;
    version_details: VersionDetail[];
  }
  
  interface VersionDetail {
    rarity: number;
    version: Resource;
  }
  
  interface Move {
    move: Resource;
    version_group_details: VersionGroupDetail[];
  }
  
  interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: Resource;
    version_group: Resource;
  }
  
  interface PastType {
    generation: Resource;
    types: Type[];
  }
  
  interface Resource {
    name: string;
    url: string;
  }
  
  interface Sprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: OtherSprites;
    versions?: VersionSprites;
  }
  
  interface OtherSprites {
    dream_world: { front_default: string | null; front_female: string | null };
    home: { front_default: string | null; front_female: string | null; front_shiny: string | null; front_shiny_female: string | null };
    "official-artwork": { front_default: string | null };
  }
  
  interface VersionSprites {
    [generation: string]: { [version: string]: Sprites };
  }
  
  interface Stat {
    base_stat: number;
    effort: number;
    stat: Resource;
  }
  
  interface Type {
    slot: number;
    type: Resource;
  }
  