mod utils;

#[ic_cdk::query]
async fn get_rarity_score(data: String) -> Vec<Vec<f64>> {
    let canister_id = data;
    let trait_object_array;
    let trait_array;
    if canister_id.clone().chars().next().unwrap() == '[' {
        (trait_object_array, trait_array) = utils::fetch_personal_data(canister_id.to_owned());
    }
    else {
        (trait_object_array, trait_array) = utils::fetch_canister_data(canister_id.to_owned()).await;
    }
    let traits_value = utils::canister_data_to_traits_value(trait_object_array,trait_array.clone());
    let (_, traits_freq) = utils::get_traits_count_freq_number(utils::reverse_mat(traits_value.clone()));
    let rarity_mat = utils::rare_calc(traits_freq.clone());
    let mut rarity_score = utils::score_calc(rarity_mat);
    rarity_score = utils::add_max_min_minus_to_rarity_score(rarity_score);
    rarity_score
}

#[ic_cdk::query]
async fn get_rarity_rank(data: String) -> Vec<Vec<f64>> {
    let canister_id = data;
    let trait_object_array;
    let trait_array;
    if canister_id.clone().chars().next().unwrap() == '[' {
        (trait_object_array, trait_array) = utils::fetch_personal_data(canister_id.to_owned());
    }
    else {
        (trait_object_array, trait_array) = utils::fetch_canister_data(canister_id.to_owned()).await;
    }
    let traits_value = utils::canister_data_to_traits_value(trait_object_array,trait_array.clone());
    let (_, traits_freq) = utils::get_traits_count_freq_number(utils::reverse_mat(traits_value));
    let rarity_mat = utils::rare_calc(traits_freq);
    let rarity_score = utils::score_calc(rarity_mat);
    let rarity_rank = utils::rare_rank(rarity_score);
    rarity_rank
}

#[ic_cdk::query]
async fn get_trait_independence(data: String) -> Vec<Vec<f64>> {
    let canister_id = data;
    let trait_object_array;
    let trait_array;
    if canister_id.clone().chars().next().unwrap() == '[' {
        (trait_object_array, trait_array) = utils::fetch_personal_data(canister_id.to_owned());
    }
    else {
        (trait_object_array, trait_array) = utils::fetch_canister_data(canister_id.to_owned()).await;
    }
    let traits_value = utils::canister_data_to_traits_value(trait_object_array,trait_array.clone());
    let (_, traits_freq) = utils::get_traits_count_freq_number(utils::reverse_mat(traits_value));
    let trait_independence = utils::trait_independence(traits_freq);
    trait_independence
}

#[ic_cdk::query]
async fn get_trait_cramersv(data: String) -> Vec<Vec<f64>> {
    let canister_id = data;
    let trait_object_array;
    let trait_array;
    if canister_id.clone().chars().next().unwrap() == '[' {
        (trait_object_array, trait_array) = utils::fetch_personal_data(canister_id.to_owned());
    }
    else {
        (trait_object_array, trait_array) = utils::fetch_canister_data(canister_id.to_owned()).await;
    }
    let traits_value = utils::canister_data_to_traits_value(trait_object_array,trait_array.clone());
    let (_, traits_freq) = utils::get_traits_count_freq_number(utils::reverse_mat(traits_value.clone()));
    let trait_cramers_v = utils::trait_cramers_v(traits_freq.clone());
    trait_cramers_v
}

#[ic_cdk::query]
async fn get_trait_normalize(data: String) -> Vec<Vec<f64>> {
    let canister_id = data;
    let trait_object_array;
    let trait_array;
    if canister_id.clone().chars().next().unwrap() == '[' {
        (trait_object_array, trait_array) = utils::fetch_personal_data(canister_id.to_owned());
    }
    else {
        (trait_object_array, trait_array) = utils::fetch_canister_data(canister_id.to_owned()).await;
    }
    let traits_value = utils::canister_data_to_traits_value(trait_object_array,trait_array.clone());
    let (traits_count, traits_freq) = utils::get_traits_count_freq_number(utils::reverse_mat(traits_value.clone()));
    let trait_normalize = utils::trait_normalize(utils::reverse_mat(traits_value), traits_count, traits_freq);
    trait_normalize
}
