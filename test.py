import scipy.io
import pandas as pd

# Load the .mat file
# (Make sure you replaced 'my_data.mat' with your actual file name)
mat_data = scipy.io.loadmat('wtds_spur_current_chipped_25kfs.mat') 

# --- ADD THIS LINE ---
# This will print all variable names in your file
print("Available variables:", mat_data.keys()) 

# --- UPDATE THIS LINE ---
# Replace 'data_variable' with the correct name you see in the printout
# It might be 'data', 'matrix', or something else.
df = pd.DataFrame(mat_data['YOUR_VARIABLE_NAME_HERE']) 

# Save to CSV
df.to_csv('output_file.csv', index=False, header=False)

print("Successfully converted to CSV!")