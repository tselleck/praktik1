(function () {
  'use strict';

  var angular = window.angular;

  var dotaControllers = angular.module('dotaControllers', []);

  // Heroes-view controller
  dotaControllers.controller('HeroesCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var heroesCtrl = this;

    $http.get('data/heroes.json').then(function (result) {
      heroesCtrl.heroes = result.data;

      heroesCtrl.strengthHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'strength' });
      heroesCtrl.agilityHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'agility' });
      heroesCtrl.intelligenceHeroes = _.filter(heroesCtrl.heroes, { 'main_attribute': 'intelligence' });
    });

    heroesCtrl.showPreview = function (hero) {
      heroesCtrl.previewHero = heroesCtrl.heroes[hero.name];
    };

    heroesCtrl.goToHeroDetail = function (hero) {
      $location.path('heroes/' + hero.name);
    };

  }]);

  //Hero-detail-view controller
  dotaControllers.controller('HeroDetailCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {

    var heroDetailCtrl = this;
    var heroName = $routeParams.heroName;

    $http.get('data/heroes.json').then(function (result) {
      heroDetailCtrl.hero = result.data[heroName];
      delete heroDetailCtrl.hero.attribute.name
    });

    // Function that returns the correct URL for heroes skills in details
    var shouldReplaceAbilityUrlName = function (ability) {
      var abilitiesThatShouldReturnTrue = {
        // Nevermore
        'Shadowraze': 'http://cdn.dota2.com/apps/dota2/images/abilities/nevermore_shadowraze1_hp1.png',
        'Presence of the Dark Lord': 'http://cdn.dota2.com/apps/dota2/images/abilities/nevermore_dark_lord_hp1.png',
        'Requiem of Souls': 'http://cdn.dota2.com/apps/dota2/images/abilities/nevermore_requiem_hp1.png',
        // Sand King
        'Burrowstrike': 'http://cdn.dota2.com/apps/dota2/images/abilities/sandking_burrowstrike_hp1.png',
        'Sand Storm': 'http://cdn.dota2.com/apps/dota2/images/abilities/sandking_sand_storm_hp1.png',
        'Caustic Finale': 'http://cdn.dota2.com/apps/dota2/images/abilities/sandking_caustic_finale_hp1.png',
        'Epicenter': 'http://cdn.dota2.com/apps/dota2/images/abilities/sandking_epicenter_hp1.png',
        // Sven
        'Storm Hammer': 'http://cdn.dota2.com/apps/dota2/images/abilities/sven_storm_bolt_hp1.png',
        // Kunkka
        'X Marks the Spot': 'http://cdn.dota2.com/apps/dota2/images/abilities/kunkka_x_marks_the_spot_hp1.png',
        // Beastmaster
        'Call of the Wild (Hawk)': 'http://cdn.dota2.com/apps/dota2/images/abilities/beastmaster_call_of_the_wild_hp1.png',
        'Call of the Wild (Boar)': 'http://cdn.dota2.com/apps/dota2/images/abilities/beastmaster_call_of_the_wild_boar_hp1.png',
        // Wraith King
        'Wraithfire Blast': 'http://cdn.dota2.com/apps/dota2/images/abilities/skeleton_king_hellfire_blast_hp1.png',
        // Dragon Knight
        'Elder Dragon Form': 'http://cdn.dota2.com/apps/dota2/images/abilities/dragon_knight_elder_dragon_form_hp1.png',
        // Night Stalker
        'Hunter in the Night': 'http://cdn.dota2.com/apps/dota2/images/abilities/night_stalker_hunter_in_the_night_hp1.png',
        // Doom
        'LVL? Death': 'http://cdn.dota2.com/apps/dota2/images/abilities/doom_bringer_lvl_death_hp1.png',
        // Spirit Breaker
        'Charge of Darkness': 'http://cdn.dota2.com/apps/dota2/images/abilities/spirit_breaker_charge_of_darkness_hp1.png',
        // Alchemist
        'Greevil\'s Greed': 'http://cdn.dota2.com/apps/dota2/images/abilities/alchemist_goblins_greed_hp1.png',
        'Unstable Concoction Throw': 'http://cdn.dota2.com/apps/dota2/images/abilities/alchemist_unstable_concoction_throw_hp1.png',
        // Treant
        'Eyes In The Forest': 'http://cdn.dota2.com/apps/dota2/images/abilities/treant_eyes_in_the_forest_hp1.png',
        // Wisp
        'Break Tether': 'http://cdn.dota2.com/apps/dota2/images/abilities/wisp_tether_break_hp1.png',
        // Bristleback
        'Viscous Nasal Goo': 'http://cdn.dota2.com/apps/dota2/images/abilities/bristleback_viscous_nasal_goo_hp1.png',
        // Tusk
        'Walrus PUNCH!': 'http://cdn.dota2.com/apps/dota2/images/abilities/tusk_walrus_punch_hp1.png',
        'Launch Snowball': 'http://cdn.dota2.com/apps/dota2/images/abilities/tusk_launch_snowball_hp1.png',
        // Abaddon
        'Mist Coil': 'http://cdn.dota2.com/apps/dota2/images/abilities/abaddon_death_coil_hp1.png',
        'Curse of Avernus': 'http://cdn.dota2.com/apps/dota2/images/abilities/abaddon_frostmourne_hp1.png',
        // Elder Titan
        'Astral Spirit': 'http://cdn.dota2.com/apps/dota2/images/abilities/elder_titan_return_spirit_hp1.png',
        'Return Astral Spirit': 'http://cdn.dota2.com/apps/dota2/images/abilities/elder_titan_return_spirit_hp1.png',
        // Legion Commander
        'Press The Attack': 'http://cdn.dota2.com/apps/dota2/images/abilities/legion_commander_press_the_attack_hp1.png',
        'Moment of Courage': 'http://cdn.dota2.com/apps/dota2/images/abilities/legion_commander_moment_of_courage_hp1.png',
        // Earth Spirit
        'Stone Remnant': 'http://cdn.dota2.com/apps/dota2/images/abilities/earth_spirit_stone_caller_hp1.png',
        'Enchant Remnant': 'http://cdn.dota2.com/apps/dota2/images/abilities/earth_spirit_petrify_hp1.png',
        // Phoenix
        'Launch Fire Spirit': 'http://cdn.dota2.com/apps/dota2/images/abilities/phoenix_launch_fire_spirit_hp1.png',
        'Stop Icarus Dive': 'http://cdn.dota2.com/apps/dota2/images/abilities/phoenix_icarus_dive_stop_hp1.png',
        'Stop Sun Ray': 'http://cdn.dota2.com/apps/dota2/images/abilities/phoenix_sun_ray_stop_hp1.png',
        'Toggle Movement': 'http://cdn.dota2.com/apps/dota2/images/abilities/phoenix_sun_ray_toggle_move_hp1.png',
        // Bloodseeker
        'Blood Rite': 'http://cdn.dota2.com/apps/dota2/images/abilities/bloodseeker_blood_bath_hp1.png',
        // Drow Ranger
        'Gust': 'http://cdn.dota2.com/apps/dota2/images/abilities/drow_ranger_wave_of_silence_hp1.png',
        'Precision Aura': 'http://cdn.dota2.com/apps/dota2/images/abilities/drow_ranger_trueshot_hp1.png',
        // Juggernaut
        'Omnislash': 'http://cdn.dota2.com/apps/dota2/images/abilities/juggernaut_omni_slash_hp1.png',
        // Mirana
        'Starstorm': 'http://cdn.dota2.com/apps/dota2/images/abilities/mirana_starfall_hp1.png',
        'Sacred Arrow': 'http://cdn.dota2.com/apps/dota2/images/abilities/mirana_arrow_hp1.png',
        'Moonlight Shadow': 'http://cdn.dota2.com/apps/dota2/images/abilities/mirana_invis_hp1.png',
        // Morphling
        'Morph (Agility Gain)': 'http://cdn.dota2.com/apps/dota2/images/abilities/morphling_morph_agi_hp1.png',
        'Morph (Strength Gain)': 'http://cdn.dota2.com/apps/dota2/images/abilities/morphling_morph_str_hp1.png',
        // Phantom Lancer
        'Doppelganger': 'http://cdn.dota2.com/apps/dota2/images/abilities/phantom_lancer_doppelwalk_hp1.png',
        // Razor
        'Eye of the Storm': 'http://cdn.dota2.com/apps/dota2/images/abilities/razor_eye_of_the_storm_hp1.png',
        // Vengeful Spirit
        'Wave of Terror': 'http://cdn.dota2.com/apps/dota2/images/abilities/vengefulspirit_wave_of_terror_hp1.png',
        'Vengeance Aura': 'http://cdn.dota2.com/apps/dota2/images/abilities/vengefulspirit_command_aura_hp1.png',
        // Phantom Assassin
        'Coup de Grace': 'http://cdn.dota2.com/apps/dota2/images/abilities/phantom_assassin_coup_de_grace_hp1.png',
        // Clinkz
        'Skeleton Walk': 'http://cdn.dota2.com/apps/dota2/images/abilities/clinkz_wind_walk_hp1.png',
        // Bounty Hunter
        'Shadow Walk': 'http://cdn.dota2.com/apps/dota2/images/abilities/bounty_hunter_wind_walk_hp1.png',
        // Lone Druid
        'Summon Spirit Bear': 'http://cdn.dota2.com/apps/dota2/images/abilities/lone_druid_spirit_bear_hp1.png',
        'Battle Cry': 'http://cdn.dota2.com/apps/dota2/images/abilities/lone_druid_true_form_battle_cry_hp1.png',
        'Druid Form': 'http://cdn.dota2.com/apps/dota2/images/abilities/lone_druid_true_form_druid_hp1.png',
        // Meepo
        'Divided We Stand': 'http://cdn.dota2.com/apps/dota2/images/abilities/meepo_divided_we_stand_hp1.png',
        // Naga Siren
        'Song of the Siren': 'http://cdn.dota2.com/apps/dota2/images/abilities/naga_siren_song_of_the_siren_hp1.png',
        'Song of the Siren Cancel': 'http://cdn.dota2.com/apps/dota2/images/abilities/naga_siren_song_of_the_siren_cancel_hp1.png',
        // Troll Warlord
        'Whirling Axes (Ranged)': 'http://cdn.dota2.com/apps/dota2/images/abilities/troll_warlord_whirling_axes_ranged_hp1.png',
        'Whirling Axes (Melee)': 'http://cdn.dota2.com/apps/dota2/images/abilities/troll_warlord_whirling_axes_melee_hp1.png',
        // Ember Spirit
        'Sleight of Fist': 'http://cdn.dota2.com/apps/dota2/images/abilities/ember_spirit_sleight_of_fist_hp1.png',
        'Activate Fire Remnant': 'http://cdn.dota2.com/apps/dota2/images/abilities/ember_spirit_activate_fire_remnant_hp1.png',
        // Crystal Maiden
        'Arcane Aura': 'http://cdn.dota2.com/apps/dota2/images/abilities/crystal_maiden_brilliance_aura_hp1.png',
        // Windrunner
        'Focus Fire': 'http://cdn.dota2.com/apps/dota2/images/abilities/windrunner_focusfire_hp1.png',
        // Lina
        'Light Strike Array': 'http://cdn.dota2.com/apps/dota2/images/abilities/lina_light_strike_array_hp1.png',
        // Lich
        'Frost Blast': 'http://cdn.dota2.com/apps/dota2/images/abilities/lich_frost_nova_hp1.png',
        'Ice Armor': 'http://cdn.dota2.com/apps/dota2/images/abilities/lich_frost_armor_hp1.png',
        'Sacrifice': 'http://cdn.dota2.com/apps/dota2/images/abilities/lich_dark_ritual_hp1.png',
        // Lion
        'Earth Spike': 'http://cdn.dota2.com/apps/dota2/images/abilities/lion_impale_hp1.png',
        'Hex': 'http://cdn.dota2.com/apps/dota2/images/abilities/lion_voodoo_hp1.png',
        'Finger of Death': 'http://cdn.dota2.com/apps/dota2/images/abilities/lion_finger_of_death_hp1.png',
        // Shadow Shaman
        'Mass Serpent Ward': 'http://cdn.dota2.com/apps/dota2/images/abilities/shadow_shaman_mass_serpent_ward_hp1.png',
        // Tinker
        'Heat-Seeking Missile': 'http://cdn.dota2.com/apps/dota2/images/abilities/tinker_heat_seeking_missile_hp1.png',
        'March of the Machines': 'http://cdn.dota2.com/apps/dota2/images/abilities/tinker_march_of_the_machines_hp1.png',
        // Warlock
        'Chaotic Offering': 'http://cdn.dota2.com/apps/dota2/images/abilities/warlock_rain_of_chaos_hp1.png',
        // Queen of Pain
        'Scream Of Pain': 'http://cdn.dota2.com/apps/dota2/images/abilities/queenofpain_scream_of_pain_hp1.png',
        // Death Prophet
        'Crypt Swarm': 'http://cdn.dota2.com/apps/dota2/images/abilities/death_prophet_carrion_swarm_hp1.png',
        // Furion
        'Nature\'s Call': 'http://cdn.dota2.com/apps/dota2/images/abilities/furion_force_of_nature_hp1.png',
        'Wrath of Nature': 'http://cdn.dota2.com/apps/dota2/images/abilities/furion_wrath_of_nature_hp1.png',
        // Dark Seer
        'Wall of Replica': 'http://cdn.dota2.com/apps/dota2/images/abilities/dark_seer_wall_of_replica_hp1.png',
        // Chen
        'Test of Faith (Damage)': 'http://cdn.dota2.com/apps/dota2/images/abilities/chen_test_of_faith_hp1.png',
        'Test of Faith (Teleport)': 'http://cdn.dota2.com/apps/dota2/images/abilities/chen_test_of_faith_teleport_hp1.png',
        'Hand of God': 'http://cdn.dota2.com/apps/dota2/images/abilities/chen_hand_of_god_hp1.png',
        // Áncient Apparition
        'Release': 'http://cdn.dota2.com/apps/dota2/images/abilities/ancient_apparition_ice_blast_release_hp1.png',
        // Silencer
        'Curse of the Silent': 'http://cdn.dota2.com/apps/dota2/images/abilities/silencer_curse_of_the_silent_hp1.png',
        'Glaives of Wisdom': 'http://cdn.dota2.com/apps/dota2/images/abilities/silencer_glaives_of_wisdom_hp1.png',
        // Obsidian Destroyer
        'Sanity\'s Eclipse': 'http://cdn.dota2.com/apps/dota2/images/abilities/obsidian_destroyer_sanity_eclipse_hp1.png',
        // Shadow Demon
        'Shadow Poison Release': 'http://cdn.dota2.com/apps/dota2/images/abilities/shadow_demon_shadow_poison_release_hp1.png',
        // Keeper of the Light
        'Release Illuminate': 'http://cdn.dota2.com/apps/dota2/images/abilities/keeper_of_the_light_illuminate_end_hp1.png',
        // Techies
        'Suicide Squad, Attack!': 'http://cdn.dota2.com/apps/dota2/images/abilities/techies_suicide_hp1.png'
      };

      if (_.has(abilitiesThatShouldReturnTrue, ability)) {
        return abilitiesThatShouldReturnTrue[ability];
      };
      return null;
    }


    heroDetailCtrl.getFormatedImageUrl = function (hero, ability) {
      var baseUrl = 'http://cdn.dota2.com/apps/dota2/images/abilities/';
      baseUrl += hero.name;
      baseUrl += '_';
      baseUrl += ability.dname.toLowerCase().replace(' ', '_').replace('\'', '');
      baseUrl += '_hp1.png';

      if (shouldReplaceAbilityUrlName(ability.dname)) {
        baseUrl = shouldReplaceAbilityUrlName(ability.dname);
      }

      return baseUrl;
    }

  }]);

  // Match-view controller
  dotaControllers.controller('HatchesCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/V1?key=9F5ED90795E74A50AEE916A820A488F2').then(function (result) {
      $scope.matches = result.data.result.matches;
    });
  }]);

  // Main-view controller
  dotaControllers.controller('HainCtrl', ['$scope', '$http', function ($scope, $http) {

  }]);

  //Items-view controller
  dotaControllers.controller('ItemsCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('data/items.json').then(function (result) {
      $scope.items = result.data.items;
    });
  }]);
})();