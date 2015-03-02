class Translation < ActiveRecord::Base
  belongs_to :key
  belongs_to :locale

  def to_s
    text
  end

  def parsed_text
    if key.array?
      YAML.load(text) || []
    else
      text
    end
  end

  def full_array
    [locale.to_s] + key.key.split('.') + [parsed_text]
  end

  def to_h
    hierarchichal_hash_from_array(full_array)
  end

  def hierarchichal_hash_from_array(array_hierarchy, hash_hierarchy = {})
    return hash_hierarchy if array_hierarchy.empty?

    # The last 2 values in the array are the most drilled down part, so given:
    # [d,c,b,a,1]
    # The first Iteration you would get:
    # { "a" => 1 }
    # Second iteration:
    # { "b" => { "a" => 1 } }, etc..
    #
    if hash_hierarchy.empty?
      value = array_hierarchy.pop
      hash_hierarchy.merge!(array_hierarchy.pop => value)
    else
      hash_hierarchy = { array_hierarchy.pop => hash_hierarchy }
    end

    return hierarchichal_hash_from_array(array_hierarchy, hash_hierarchy)
  end
end
