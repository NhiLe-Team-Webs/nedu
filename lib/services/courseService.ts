import { supabase } from '@/lib/db';
import { CourseDetail, Program, ProgramDescription, Mentor } from '@/lib/types/course';

export async function getCourseDetailBySlug(slug: string, langId: number = 1): Promise<CourseDetail | null> {
    try {
        console.log('--- [DEBUG] FETCHING ID 82 FOR SLUG:', slug, '---');

        // 1. Fetch program ID 82
        const { data: programData, error: programError } = await supabase
            .from('program')
            .select('*')
            .eq('id', 82)
            .maybeSingle();

        if (programError || !programData) {
            console.error('[DEBUG] Program ID 82 NOT FOUND or Error:', programError);
            return null;
        }

        console.log('[DEBUG] STEP 1: Program Data from DB:', programData);
        const program = programData as Program;

        // 2. Fetch description for ID 82
        const { data: descriptionData, error: descriptionError } = await supabase
            .from('program_description')
            .select('*')
            .eq('program_id', 82)
            .eq('lang_id', langId)
            .maybeSingle();

        if (descriptionError) {
            console.error('[DEBUG] Description Fetch Error:', descriptionError);
        }

        console.log('[DEBUG] STEP 2: Description Data from DB:', descriptionData);
        const description = descriptionData as ProgramDescription;

        // 3. Fetch mentors via program_mentor junction
        const { data: mentorData, error: mentorError } = await supabase
            .from('program_mentor')
            .select(`
                mentor (*)
            `)
            .eq('program_id', 82);

        if (mentorError) {
            console.error('[DEBUG] Mentor Fetch Error:', mentorError);
        }

        const mentors = (mentorData?.map((m: any) => m.mentor) || []) as Mentor[];
        console.log('[DEBUG] STEP 3: Mentors Found:', mentors.length);

        return {
            program,
            description,
            mentors
        };
    } catch (error) {
        console.error('Unexpected error in getCourseDetailBySlug:', error);
        return null;
    }
}
