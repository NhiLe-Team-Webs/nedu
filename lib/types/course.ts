export interface Program {
    id: number;
    created_at: string;
    image: string | null;
    program_price: number | null;
    instructor: string | null;
    hashtag: string | null;
    program_name: string | null;
    total_sessions: string | null;
    is_payment_full: boolean;
    season: number | null;
    link_payment: string | null;
    category_id: number | null;
    program_type: number | null;
    start_date: string | null;
    end_date: string | null;
    status: number | null;
    banner: string | null;
    session: number | null;
    program_fee: string | null;
    mission_image: string | null;
    link_group: string | null;
}

export interface ProgramDescription {
    lang_id: number;
    program_id: number;
    title_slogan: string | null;
    slogan: string | null;
    program_name: string | null;
    instructors: any | null;
    target_audience: any | null;
    reasons_to_choose: any | null;
    information: any | null;
    program_schedule: any | null;
    privilege: any | null;
    topic: string | null;
    short_description: string | null;
    content: string | null;
    video_url: string | null;
    highlight_features: any | null;
}

export interface Mentor {
    id: number;
    name: string;
    role: string | null;
    bio: string | null;
    avatar_url: string | null;
    status: number | null;
    is_featured: boolean;
}

export interface ThirtyDayConfig {
    id: number;
    program_id: number;
    monthly_fee: number;
    membership_fee: number;
    benefit_1_title: string | null;
    benefit_1_quote: string | null;
    benefit_1_description: string | null;
    benefit_2_title: string | null;
    benefit_2_quote: string | null;
    benefit_2_description: string | null;
    benefit_3_title: string | null;
    benefit_3_quote: string | null;
    benefit_3_description: string | null;
}

export interface CourseDetail {
    program: Program;
    description: ProgramDescription;
    mentors: Mentor[];
    thirtyDayConfig?: ThirtyDayConfig | null;
}
