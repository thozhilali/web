import csv
import json

# Read the CSV file
data = []
with open('NationalBoardofAccreditation.csv', 'r') as file:
    reader = csv.DictReader(file)
    for row in reader:
        # Extract city, college, and accredited courses
        college = row['Name of the Institution']
        program = row['Program']
        accreditation = row['Accreditation Status']
        
        # Extract city from college name
        if '(' in college:
            city = college.split('(')[1].strip(')')
        else:
            city = 'Unknown'
        
        # Append to the data list
        data.append({
            'city': city,
            'college': college,
            'accredited_courses': [program]
        })

# Create a dictionary to store the unique colleges and their accredited courses
result = {}
for item in data:
    college = item['college']
    if college not in result:
        result[college] = {
            'city': item['city'],
            'college': item['college'],
            'accredited_courses': []
        }
    if item['accredited_courses'][0] not in result[college]['accredited_courses']:
        result[college]['accredited_courses'].append(item['accredited_courses'][0])

# Convert the dictionary to JSON
json_output = json.dumps(list(result.values()), indent=2)
print(json_output)
