/**
 * MUSCLE FITNESS GYM - ATHLETIC CALCULATORS
 * 1. 1-Rep Max Strength Estimator (Brzycki / Epley Biomechanics)
 * 2. Bangalore Daily Calorie & Macronutrient Athlete Target (Mifflin-St Jeor)
 */

document.addEventListener('DOMContentLoaded', () => {
  initOneRepMaxCalculator();
  initMacroCalculator();
  initCalculatorTabs();
});

// Calculator Tab Switcher
function initCalculatorTabs() {
  const tabs = document.querySelectorAll('.calc-tab-btn');
  const panels = document.querySelectorAll('.calc-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.hidden = true);

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(tab.getAttribute('aria-controls'));
      if (targetPanel) {
        targetPanel.hidden = false;
      }
    });
  });
}

// 1RM Estimator
function initOneRepMaxCalculator() {
  const liftSelect = document.getElementById('1rm-lift');
  const weightInput = document.getElementById('1rm-weight');
  const repsInput = document.getElementById('1rm-reps');
  const resultDisplay = document.getElementById('1rm-result-val');
  const percentageList = document.getElementById('1rm-percentages');

  function calculate1RM() {
    const weight = parseFloat(weightInput.value);
    const reps = parseInt(repsInput.value, 10);

    if (isNaN(weight) || weight <= 0 || isNaN(reps) || reps <= 0) {
      if (resultDisplay) resultDisplay.textContent = '--';
      return;
    }

    let estimated1RM;
    if (reps === 1) {
      estimated1RM = weight;
    } else {
      // Epley Formula: W * (1 + r/30)
      estimated1RM = Math.round(weight * (1 + reps / 30));
    }

    if (resultDisplay) {
      resultDisplay.textContent = `${estimated1RM} kg`;
    }

    if (percentageList) {
      const p95 = Math.round(estimated1RM * 0.95);
      const p90 = Math.round(estimated1RM * 0.90);
      const p80 = Math.round(estimated1RM * 0.80);
      const p70 = Math.round(estimated1RM * 0.70);

      percentageList.innerHTML = `
        <div class="percentage-row">
          <span>95% (Heavy 2 Reps):</span> <strong>${p95}&nbsp;kg</strong>
        </div>
        <div class="percentage-row">
          <span>90% (Power 3-4 Reps):</span> <strong>${p90}&nbsp;kg</strong>
        </div>
        <div class="percentage-row">
          <span>80% (Hypertrophy 6-8 Reps):</span> <strong>${p80}&nbsp;kg</strong>
        </div>
        <div class="percentage-row">
          <span>70% (Endurance 10-12 Reps):</span> <strong>${p70}&nbsp;kg</strong>
        </div>
      `;
    }
  }

  if (weightInput && repsInput) {
    weightInput.addEventListener('input', calculate1RM);
    repsInput.addEventListener('input', calculate1RM);
    if (liftSelect) liftSelect.addEventListener('change', calculate1RM);
    calculate1RM();
  }
}

// Daily Calorie & Macro Target
function initMacroCalculator() {
  const genderInputs = document.querySelectorAll('input[name="calc-gender"]');
  const weightInput = document.getElementById('macro-weight');
  const heightInput = document.getElementById('macro-height');
  const ageInput = document.getElementById('macro-age');
  const activitySelect = document.getElementById('macro-activity');
  const goalSelect = document.getElementById('macro-goal');

  const calorieOutput = document.getElementById('macro-calories-val');
  const proteinOutput = document.getElementById('macro-protein-val');
  const carbsOutput = document.getElementById('macro-carbs-val');
  const fatsOutput = document.getElementById('macro-fats-val');

  function calculateMacros() {
    const weight = parseFloat(weightInput?.value);
    const height = parseFloat(heightInput?.value);
    const age = parseInt(ageInput?.value, 10);
    const activityMult = parseFloat(activitySelect?.value || 1.55);
    const goalVal = goalSelect?.value || 'cut';

    let gender = 'male';
    genderInputs.forEach(input => {
      if (input.checked) gender = input.value;
    });

    if (isNaN(weight) || isNaN(height) || isNaN(age)) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    let tdee = bmr * activityMult;
    let targetCalories = tdee;

    if (goalVal === 'cut') {
      targetCalories = tdee - 500; // Caloric deficit
    } else if (goalVal === 'recomp') {
      targetCalories = tdee; // Maintenance
    } else if (goalVal === 'bulk') {
      targetCalories = tdee + 350; // Surplus
    }

    targetCalories = Math.round(targetCalories);

    // High athletic protein: 2.2g per kg body weight
    const proteinGrams = Math.round(weight * 2.2);
    const proteinCalories = proteinGrams * 4;

    // Healthy fats: ~25% of total calories
    const fatCalories = targetCalories * 0.25;
    const fatGrams = Math.round(fatCalories / 9);

    // Remaining calories to carbs
    const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
    const carbGrams = Math.round(carbCalories / 4);

    if (calorieOutput) calorieOutput.textContent = `${targetCalories} kcal`;
    if (proteinOutput) proteinOutput.textContent = `${proteinGrams}g`;
    if (carbsOutput) carbsOutput.textContent = `${carbGrams}g`;
    if (fatsOutput) fatsOutput.textContent = `${fatGrams}g`;
  }

  const inputs = [weightInput, heightInput, ageInput, activitySelect, goalSelect];
  inputs.forEach(el => {
    if (el) el.addEventListener('input', calculateMacros);
  });
  genderInputs.forEach(el => el.addEventListener('change', calculateMacros));

  calculateMacros();
}
